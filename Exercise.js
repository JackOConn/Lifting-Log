import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  LayoutAnimation,
  Pressable,
  Modal
} from "react-native";
import {
  Text,
  Input,
  AddIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DeleteIcon,
} from "native-base";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { v4 as uuid } from "uuid";
import { Set } from "./Set";

export const Exercise = ({ item, index, entryIndex }) => {
  const [expanded, setExpanded] = useState(false);
  const [isRender, setisRender] = useState(false);
  const [name, setName] = useState();
  const [showModal, setShowModal] = useState(false);
  const [isClosed, setIsClosed] = useState(true);
  const isDeleting = " ";

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

  const closeEntry = async (shouldDelete) => {
    itemRef.close();
    if (shouldDelete) {
      await delay(500);
      navigation.navigate("View Entry", { exerciseIndex: index, isDeleting, index: entryIndex });
    }
  };

  const handleAddSet = (item, weight, reps) => {
    const newSets = [...item.exerciseSets];
    item.exerciseSets = [
      ...newSets,
      { setID: uuid(), weight: weight, reps: reps },
    ];
    setisRender(!isRender);
    LayoutAnimation.configureNext(layoutAnimConfig);
  };

  React.useEffect(() => {
    setName(item.exerciseName);
  });

  const renderRight = () => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            setShowModal(true);
          }}
          style={styles.swipeView}
        >
          <DeleteIcon color={"#fff"} size={"lg"}></DeleteIcon>
        </TouchableOpacity>

        <Modal
          style={styles.modalView}
          visible={showModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => {
            setShowModal(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Pressable
                style={styles.modalDelete}
                onPress={() => {
                  setShowModal(false);
                  closeEntry(true);
                }}
              >
                <Text style={styles.modalDeleteText}>Delete</Text>
              </Pressable>
              <Pressable
                style={styles.modalCancel}
                onPress={() => {
                  setShowModal(false);
                  closeEntry(false);
                }}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </>
    );
  };

  const renderItem = ({ item, index }) => {
    return <Set item={item} index={index}></Set>;
  };

  const navigation = useNavigation();
  let itemRef;
  return (
    <GestureHandlerRootView>
      <Swipeable
        ref={(ref) => (itemRef = ref)}
        overshootFriction={30}
        renderRightActions={renderRight}
        onSwipeableWillClose={(itemRef) => setIsClosed(true)}
        onSwipeableWillOpen={(itemRef) => setIsClosed(false)}
      >
        <View style={styles.itemContainer}>
          <View style={styles.item}>
            <Input
              left={15}
              width={"80%"}
              variant={"unstyled"}
              placeholder={"exercise name"}
              style={styles.exerciseInput}
              value={name}
              onChangeText={(val) => {
                item.exerciseName = val;
                setName(val);
              }}
            ></Input>
            <Text style={styles.setsAmount}>
              {item.exerciseSets.length}
              {item.exerciseSets.length == 1 ? " set" : " sets"}
            </Text>
            <Pressable
              activeOpacity={0.7}
              key={index}
              style={styles.chevronContainer}
              onPress={() => {
                LayoutAnimation.configureNext(layoutAnimConfig);
                setExpanded(!expanded);
              }}
            >
              {expanded ? (
                <ChevronUpIcon
                  style={styles.chevronDown}
                  color={"#93988a"}
                ></ChevronUpIcon>
              ) : (
                <ChevronDownIcon
                  style={styles.chevronDown}
                  color={"#93988a"}
                ></ChevronDownIcon>
              )}
            </Pressable>
          </View>

          {expanded && (
            <>
              <FlatList
                keyExtractor={(item) => item.setID.toString()}
                data={item.exerciseSets}
                renderItem={renderItem}
                extraData={isRender}
              />
              <View style={styles.itemAdd}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.addSetButton}
                  onPress={() => {
                    handleAddSet(item);
                  }}
                >
                  <AddIcon size={"sm"} color={"#ced9bf"}></AddIcon>
                  <Text color={"#ced9bf"} marginLeft={2}>
                    add new set
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    overflow: "hidden",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  item: {
    justifyContent: "center",
    backgroundColor: "#14171a",
    alignItems: "flex-start",
    borderColor: "#23292d",
    borderRadius: "0%",
    width: "100%",
    height: 110,
    borderBottomWidth: 1,
  },

  itemExpanded: {
    justifyContent: "center",
    backgroundColor: "#14171a",
    alignItems: "flex-start",
    width: "100%",
    height: 110,
  },

  text: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 30,
    color: "#ced9bf",
    top: 4,
  },

  text2: {
    fontSize: 16,
    marginLeft: 30,
    color: "#ced9bf",
    top: 3,
  },

  setsAmount: {
    fontSize: 12,
    marginLeft: 28,
    color: "#93988a",
    top: -3,
  },

  addSetText: {
    fontSize: 16,
    color: "#fff",
    top: 3,
  },

  chevronContainer: {
    height: 60,
    width: 60,
    position: "absolute",
    right: 25,
    justifyContent: "center",
  },

  chevronDown: {
    color: "#93988a",
    alignSelf: "center",
  },

  itemAdd: {
    flexDirection: "row",
    backgroundColor: "#101010",
    borderColor: "#080808",
    width: "100%",
    height: 70,
    borderBottomColor: "#181818",
  },

  exerciseInput: {
    color: "#ced9bf",
    fontSize: 22,
    top: 4,
  },

  addSetButton: {
    flexDirection: "row",
    backgroundColor: "#08090a",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    borderWidth: 1.25,
    borderColor: "#303030",
    borderStyle: "dashed",
  },

  
  swipeView: {
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff4137",
  },

  modalContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },

  modalView: {
    justifyContent: "flex-end",
  },

  modalContent: {
    width: "95%",
    height: "25%",
    overflow: "hidden",
    bottom: 0,
  },

  modalDelete: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#14171a",
    height: "35%",
    width: "100%",
    borderRadius: "15%",
  },

  modalCancel: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#14171a",
    height: "35%",
    width: "100%",
    borderRadius: "15%",
    top: 8,
  },

  modalDeleteText: {
    fontWeight: "bold",
    color: "#ff4137",
    fontSize: 22,
  },

  modalCancelText: {
    fontWeight: "bold",
    color: "#82b3c9",
    fontSize: 22,
  },
});
