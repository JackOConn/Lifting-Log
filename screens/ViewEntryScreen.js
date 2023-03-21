import {
  Button,
  NativeBaseProvider,
  AddIcon,
  ArrowBackIcon,
  Input,
} from "native-base";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Exercise } from "../Exercise";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";

export default function ViewEntryScreen({ navigation, route }) {
  const [isRender, setisRender] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [entryName, setEntryName] = useState();
  const [isNew, setIsNew] = useState(false);

  // if route is from Home Screen, populate exercises and entry name
  React.useEffect(() => {
    if (route.params?.fromHome) {
      route.params.fromHome = null;
      setExercises(route.params.item.exercises);
      setEntryName(route.params.item.title);
    }
  });

  // if route is from Home, and is adding new Entry
  React.useEffect(() => {
    if (route.params?.fromHomeNew) {
      route.params.fromHomeNew = null;
      setIsNew(true);
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
                entryName,
              })
            }
          >
            <ArrowBackIcon size={"md"} color={"#26abff"}></ArrowBackIcon>
          </Button>
          {/* Back Button */}
        </SafeAreaView>
      </View>
      {/* Header */}

      {/* Title & Date */}
      <View style={styles.titleAndDateContainer}>
        <Input
          top={2}
          alignSelf={"center"}
          placeholder="entry name"
          maxLength={20}
          width={"85%"}
          variant={"unstyled"}
          style={styles.textInput}
          value={entryName}
          onChangeText={(val) => setEntryName(val)}
        ></Input>
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

      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleNewExercise()}
        >
          <AddIcon size={"md"} color={"#fff"}></AddIcon>
        </TouchableOpacity>
      </View>
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
    flex: 1,
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
    top: 10,
  },

  headerButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    backgroundColor: "#26abff",
    justifyContent: "center",
    alignItems: "center",
  },

  textInput: {
    color: "#fff",
    fontSize: 36,
    textAlign: "center",
    fontWeight: "bold",
    top: 8,
  },
});
