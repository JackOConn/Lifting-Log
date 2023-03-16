import {
  Button,
  NativeBaseProvider,
  AddIcon,
  ArrowBackIcon,
  KeyboardAvoidingView,
} from "native-base";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState, useRef } from "react";
import { Exercise } from "../Exercise";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";

export default function ViewEntryScreen({ navigation, route }) {
  const [isRender, setisRender] = useState(false);
  const [exercises, setExercises] = useState([]);
  // const [exerciseSets, setExerciseSets] = useState([]);

  // new set added
  React.useEffect(() => {
    if (route.params?.exerciseName) {
      handleNewExercise(route.params.exerciseName);
    }
  });

  // if route is from Home Screen, populate exercises
  React.useEffect(() => {
    if (route.params?.fromHome) {
      route.params.fromHome = null;
      setExercises(route.params.item.exercises);
    }
  });

  const handleNewExercise = (exerciseName) => {
    route.params.exerciseName = null;
    const newExercises = [...exercises];
    setExercises([
      ...newExercises,
      {
        exerciseName: exerciseName,
        exerciseSets: [],
      },
    ]);
  };

  // const handleNewExerciseSet = (item) => {
  //   route.params.exerciseName = null;
  //   const newExercises = [...exercises];
  //   setExercises([
  //     ...newExercises,
  //     {
  //       exerciseName: exerciseName,
  //       exerciseSets: ["Hello", "Goodbye"],
  //     },
  //   ]);
  // };

  const renderItem = ({ item, index }) => {
      return <Exercise item={item} index={index}></Exercise>;
  };

  return (
    <NativeBaseProvider>
      
      {/* Header */}
      <View style={styles.header}>
        <SafeAreaView style={styles.headerButtonsContainer}>
          {/* Back Button */}
          <Button
            paddingLeft={8}
            alignSelf={"flex-start"}
            variant={"link"}
            size={"lg"}
            onPress={() =>
              navigation.navigate("Home", {
                exercises,
                entryIndex: route.params.index,
              })
            }
          >
            <ArrowBackIcon size={"md"} color={"#26abff"}></ArrowBackIcon>
          </Button>
          {/* Back Button */}

          {/* Add Set Button */}
          <Button
            paddingRight={8}
            alignSelf={"flex-end"}
            variant={"link"}
            size={"lg"}
            onPress={() =>
              navigation.navigate("New Set", {
                item: route.params.item,
                index: route.params.index,
              })
            }
          >
            <AddIcon size={"md"} color={"#26abff"}></AddIcon>
          </Button>
          {/* Add Set Button */}
        </SafeAreaView>
      </View>
      {/* Header */}

      {/* Title & Date */}
      <View style={styles.titleAndDateContainer}>
        <Text style={styles.textTitle}>{route.params.item.title}</Text>
        <Text style={styles.textDate}>{route.params.item.date}</Text>
      </View>
      {/* Title & Date */}

      {/* List of Exercises */}
      <SafeAreaView behavior="padding" style={styles.container}>
        <KeyboardAwareFlatList
          data={exercises}
          renderItem={renderItem}
          extraData={isRender}
        />
      </SafeAreaView>
      {/* List of Exercises */}
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    height: "11%",
    backgroundColor: "#151515",
    maxWidth: "100%",
    left: 0,
    bottom: 0,
    right: 0,
  },

  container: {
    flexGrow: 1,
    backgroundColor: "#080808",
    paddingBottom: 0.12,
  },

  titleAndDateContainer: {
    height: "11%",
    backgroundColor: "#080808",
  },

  textTitle: {
    color: "#fff",
    fontSize: 36,
    alignSelf: "center",
    top: 20,
  },

  textDate: {
    color: "#9c9c9c",
    alignSelf: "center",
    top: 28,
  },

  headerButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
