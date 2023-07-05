import {
  Button,
  NativeBaseProvider,
  Input,
  ChevronLeftIcon,
  ThreeDotsIcon,
} from "native-base";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  LayoutAnimation,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Exercise } from "../components/Exercise";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { v4 as uuid } from "uuid";
import { COLORS } from "../colors";

export default function ViewEntryScreen({ navigation, route }) {
  const [isRender, setisRender] = useState(false);
  const [entryName, setEntryName] = useState();
  const [date, setDate] = useState();
  const [exercises, setExercises] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const isDeleting = " ";
  let listViewRef;

  const layoutAnimConfig = {
    update: {
      duration: 500,
      type: LayoutAnimation.Types.easeInEaseOut,
    },
    create: {
      duration: 200,
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
    delete: {
      duration: 200,
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
  };

  React.useEffect(() => {
    if (route.params?.fromHome) {
      // if route is from Home Screen, populate exercises and entry name
      route.params.fromHome = null;
      setExercises(route.params.item.exercises);
      setEntryName(route.params.item.title);
      setDate(route.params.item.id);
    } else if (route.params?.fromHomeNew) {
      // if route is from Home, and is adding new Entry
      route.params.fromHomeNew = null;
      setDate(route.params.item.id);
    } else if (route.params?.isDeleting) {
      // deleting exercise
      handleDeleteExercise(route.params.exerciseIndex);
    } else if (route.params?.deletingSet) {
      // deleting set
      handleDeleteSet(route.params.exercise, route.params.setIndex);
    }
  });

  const handleNewExercise = async (exerciseName) => {
    route.params.exerciseName = null;
    await delay(1);
    const newExercises = [...exercises];
    setExercises([
      ...newExercises,
      {
        exerciseID: uuid(),
        exerciseName: exerciseName,
        exerciseSets: [],
      },
    ]);
    setisRender(!isRender);
    LayoutAnimation.configureNext(layoutAnimConfig);
  };

  const handleDeleteExercise = (index) => {
    route.params.isDeleting = null;
    const newExercises = [...exercises];
    newExercises.splice(index, 1);
    setExercises(newExercises);
    setisRender(!isRender);
    LayoutAnimation.configureNext(layoutAnimConfig);
  };

  const handleDeleteSet = (exercise, index) => {
    route.params.deletingSet = null;
    route.params.setIndex = null;
    route.params.exercise = null;
    const newExercises = [...exercises];
    let exIdx = newExercises.findIndex(
      (ex) => ex.exerciseID === exercise.exerciseID
    );
    newExercises[exIdx]["exerciseSets"].splice(index, 1);
    setExercises(newExercises);
    setisRender(!isRender);
    LayoutAnimation.configureNext(layoutAnimConfig);
  };

  const handleDeleteEntry = async (shouldDelete) => {
    await delay(50);
    navigation.navigate("Home", { index: route.params.index, isDeleting });
  };

  const scrollToBottom = () => {
    listViewRef.scrollToEnd({ animated: true });
  };

  const renderItem = ({ item, index }) => {
    return (
      <Exercise
        exercise={item}
        index={index}
        entryIndex={route.params.index}
        route={route}
      ></Exercise>
    );
  };

  return (
    <NativeBaseProvider>
      {/* Header */}
      <View style={styles.header}>
        <SafeAreaView style={styles.headerButtonsContainer}>
          {/* Back Button */}
          <Button
            left={"3%"}
            alignSelf={"flex-start"}
            variant={"link"}
            size={"lg"}
            onPress={() => {
              navigation.navigate("Home", {
                exercises,
                entryIndex: route.params.index,
                entryName,
              });
            }}
          >
            <ChevronLeftIcon
              size={"lg"}
              color={COLORS.purple}
            ></ChevronLeftIcon>
          </Button>
          {/* Back Button */}
        </SafeAreaView>
      </View>
      {/* Header */}

      {/* Title & Date */}
      <View style={styles.titleAndDateContainer}>
        <Input
          alignSelf={"flex-start"}
          placeholder="entry name"
          maxLength={20}
          width={"75%"}
          variant={"unstyled"}
          style={styles.textInput}
          value={entryName}
          onChangeText={(val) => setEntryName(val)}
        ></Input>
        <Text style={styles.textDate}>{date}</Text>
        <Pressable
          style={styles.headerPressable}
          onPress={() => {
            setShowModal(true);
          }}
        >
          <ThreeDotsIcon alignSelf={"center"}></ThreeDotsIcon>
        </Pressable>
      </View>

      {/* Modal */}
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
              activeOpacity={0.5}
              style={styles.modalButton}
              onPress={() => {
                handleNewExercise();
                setShowModal(false);
                scrollToBottom();
              }}
            >
              <Text style={styles.addSetText}>Add New Exercise</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.modalButton}
              onPress={() => handleDeleteEntry()}
            >
              <Text style={styles.deleteExerciseText}>Delete Entry</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
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
      {/* Modal */}

      {/* List of Exercises */}
      <SafeAreaView behavior="padding" style={styles.container}>
        <KeyboardAwareFlatList
          keyExtractor={(exercise) => exercise.exerciseID}
          data={exercises}
          renderItem={renderItem}
          extraData={isRender}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListHeaderComponent={
            <View
              width={"100%"}
              height={20}
              backgroundColor={COLORS.black}
            ></View>
          }
          ref={(ref) => {
            listViewRef = ref;
          }}
        />
      </SafeAreaView>
      {/* List of Exercises */}
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    height: "11%",
    backgroundColor: COLORS.black,
    zIndex: 10,
  },

  headerButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  titleAndDateContainer: {
    height: "11%",
    backgroundColor: COLORS.dark_gray,
    borderBottomWidth: 0,
    borderColor: "#23292d",
    flexDirection: "column",
    justifyContent: "center",
    zIndex: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 3,
  },

  textInput: {
    color: COLORS.white,
    fontSize: 30,
    fontWeight: "bold",
    left: "30%",
  },

  textDate: {
    color: COLORS.gray,
    left: "7%",
    bottom: "7%",
  },

  headerPressable: {
    height: 50,
    width: 50,
    position: "absolute",
    justifyContent: "center",
    top: "25%",
    right: "5%",
  },

  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: COLORS.black,
  },

  addButtonContainer: {
    position: "absolute",
    bottom: 55,
    right: 30,
  },

  addButton: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    backgroundColor: COLORS.purple,
    justifyContent: "center",
    alignItems: "center",
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
