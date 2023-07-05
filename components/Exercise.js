import React, { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  LayoutAnimation,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Text, Input, ThreeDotsIcon } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { v4 as uuid } from "uuid";
import { Set } from "./Set";
import { COLORS } from "../colors";

export const Exercise = ({ exercise, index, entryIndex }) => {
  const [isRender, setisRender] = useState(false);
  const [name, setName] = useState();
  const [showModal, setShowModal] = useState(false);

  const layoutAnimConfig = {
    update: {
      duration: 300,
      property: LayoutAnimation.Properties.opacity,
      type: LayoutAnimation.Types.easeInEaseOut,
    },
    create: {
      duration: 300,
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
    delete: {
      duration: 200,
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
  };

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const navigation = useNavigation();
  const isDeleting = " ";

  const handleDeleteExercise = async () => {
    await delay(500);
    navigation.navigate("View Entry", {
      exerciseIndex: index,
      isDeleting,
      index: entryIndex,
    });
  };

  const handleAddSet = async (exercise, weight, reps) => {
    await delay(1);
    const newSets = [...exercise.exerciseSets];
    exercise.exerciseSets = [
      ...newSets,
      { setID: uuid(), weight: weight, reps: reps },
    ];
    setisRender(!isRender);
    LayoutAnimation.configureNext(layoutAnimConfig);
    
  };

  React.useEffect(() => {
    setName(exercise.exerciseName);
  });

  const renderItem = ({ item, index }) => {
    return (
      <Set
        set={item}
        index={index}
        exercise={exercise}
        entryIndex={entryIndex}
      ></Set>
    );
  };

  return (
    <View>
      <View style={styles.itemContainer}>
        <View style={styles.item}>
          <Input
            width={"80%"}
            variant={"unstyled"}
            placeholder={"exercise name"}
            style={styles.exerciseInput}
            value={name}
            onChangeText={(val) => {
              exercise.exerciseName = val;
              setName(val);
            }}
          ></Input>
          <Text style={styles.setsAmount}>
            {exercise.exerciseSets.length}
            {exercise.exerciseSets.length == 1 ? " set" : " sets"}
          </Text>
          <View
            position={"absolute"}
            height={"100%"}
            width={"95%"}
            alignItems={"flex-end"}
            justifyContent={"center"}
            zIndex={-1}
          >
            <Pressable
              style={styles.chevronContainer}
              onPress={() => {
                setShowModal(true);
                LayoutAnimation.configureNext(layoutAnimConfig);
              }}
            >
              <ThreeDotsIcon
                alignSelf={"center"}
                color={COLORS.gray}
              ></ThreeDotsIcon>
            </Pressable>
          </View>
        </View>

        <Modal
          style={styles.modalView}
          visible={showModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => {
            setShowModal(false);
          }}
        >
          <Pressable
            style={styles.modalContainer}
            onPress={() => {
              setShowModal(false);
            }}
          >
            <View style={styles.modalContent}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.modalButton}
                onPress={() => {
                  handleAddSet(exercise);
                  setShowModal(false);
                }}
              >
                <Text style={styles.addSetText}>Add New Set</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.modalButton}
                onPress={() => {
                  handleDeleteExercise();
                  setShowModal(false);
                }}
              >
                <Text style={styles.deleteExerciseText}>Delete Exercise</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.modalButton}
                onPress={() => {
                  setShowModal(false);
                }}
              >
                <Text style={styles.cancelModalText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>

        <FlatList
          keyExtractor={(set) => set.setID}
          data={exercise.exerciseSets}
          renderItem={renderItem}
          extraData={isRender}
        />
      </View>
      <View width={"100%"} height={20}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
  },

  item: {
    justifyContent: "center",
    backgroundColor: COLORS.dark_gray,
    alignItems: "flex-start",
    width: "100%",
    height: 110,
  },

  chevronContainer: {
    position: "relative",
    height: 50,
    width: 50,
    justifyContent: "center",
  },

  exerciseInput: {
    color: COLORS.white,
    left: "34%",
    fontSize: 26,
  },

  setsAmount: {
    fontSize: 13,
    left: "7%",
    bottom: "7%",
    color: COLORS.gray,
  },

  modalContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },

  modalView: {
    justifyContent: "flex-end",
  },

  modalContent: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "95%",
    height: "30%",
    overflow: "hidden",
    bottom: "10%",
  },

  modalButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.dark_gray,
    height: "30%",
    width: "100%",
    borderRadius: "15%",
  },

  addSetText: {
    fontWeight: "bold",
    color: COLORS.purple,
    fontSize: 22,
  },

  deleteExerciseText: {
    fontWeight: "bold",
    color: COLORS.red,
    fontSize: 22,
  },

  cancelModalText: {
    fontWeight: "bold",
    color: COLORS.gray,
    fontSize: 22,
  },
});
