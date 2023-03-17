import React, { useState } from "react";
import { NativeBaseProvider, Button, AddIcon, Text } from "native-base";
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  SectionList,
} from "react-native";
import { EntryItem } from "../EntryItem";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function HomeScreen({ navigation, route }) {
  const current = new Date();
  const currDate = `${
    current.getMonth() + 1
  }/${current.getDate()}/${current.getFullYear()}`;

  const [isRender, setisRender] = useState(false);
  const [entries, setEntries] = useState([]);

  // if adding new entry, create new entry
  React.useEffect(() => {
    if (route.params?.entryName) {
      handleNewEntry(route.params.entryName);
    }
  });

  // if coming from View Entry Screen, update entry's sets
  React.useEffect(() => {
    if (route.params?.exercises) {
      handleNewExercises(route.params.exercises, route.params.entryIndex);
    }
  });

  const handleNewEntry = (newEntry) => {
    route.params.entryName = null;
    const newEntries = [...entries];
    setEntries([
      {
        title: newEntry,
        date: currDate,
        exercises: [],
      },
      ...newEntries,
    ]);
  };

  const handleNewExercises = (exercises, index) => {
    route.params.exercises = null;
    route.params.entryIndex = null;
    const currEntry = entries[index];
    currEntry["exercises"] = exercises;
    setEntries([...entries]);
  };

  // const handleDeleteEntry = (index) => {
  //   const newEntries = [...entries];
  //   newEntries.splice(index, 1);
  //   setEntries(newEntries);
  // };

  const fromHome = " ";

  const renderItem = ({ item, index }) => {
    return <EntryItem item={item} index={index}></EntryItem>;
  };

  return (
    <NativeBaseProvider>
      {/* Header */}
      <View style={styles.header}>
        <SafeAreaView>
          {/* Add Button */}
          {/* <Button
            paddingRight={8}
            alignSelf={"flex-end"}
            variant={"link"}
            size={"lg"}
            onPress={() => navigation.navigate("New Entry")}
          >
            <AddIcon size={"md"} color={"#26abff"}></AddIcon>
          </Button> */}
          {/* Add Button */}
        </SafeAreaView>
      </View>
      {/* Header */}

      {/* List */}
      <SafeAreaView style={styles.container}>
        <FlatList
          // ListHeaderComponent={()=><Text alignSelf={"center"} fontSize={24} color={"#9a9a9a"}>entries: {entries.length}</Text>}
          contentContainerStyle={{ top: 20, paddingBottom: 30 }}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          data={entries}
          renderItem={renderItem}
          extraData={isRender}
        />
      </SafeAreaView>
      {/* List */}

      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("New Entry")}>
          <AddIcon size={"lg"} color={"#26abff"}></AddIcon>
        </TouchableOpacity>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    height: "11%",
    flexDirection: "column",
    backgroundColor: "#151515",
    justifyContent: "center",
  },

  headerText: {
    color: "#87Ceeb",
    fontSize: 26,
  },

  container: {
    flex: 1,
    backgroundColor: "#080808",
    paddingBottom: 0.3,
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
    backgroundColor: "#141414",
    justifyContent: "center",
    alignItems: "center",
  }
});
