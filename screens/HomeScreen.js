import React, { useEffect, useState } from "react";
import { NativeBaseProvider, Button, AddIcon, Text } from "native-base";
import { StyleSheet, View, FlatList, SafeAreaView } from "react-native";
import { EntryItem } from "../EntryItem";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation, route }) {
  useEffect(() => {
    async function tempFunction() {
      await getEntries();
    }
    tempFunction();
    return () => {};
  }, []);

  const current = new Date();
  const currDate = `${
    current.getMonth() + 1
  }/${current.getDate()}/${current.getFullYear()}`;

  const [isLoading, setIsLoading] = React.useState(false);
  const [isRender, setisRender] = useState(false);
  const [entries, setEntries] = useState([]);
  const [addingEntry, setAddingEntry] = useState(false);

  const saveEntries = async () => {
    try {
      const output = JSON.stringify(entries);
      await AsyncStorage.setItem("entryList", output);
    } catch (error) {
      console.log(error);
    }
  };

  const getEntries = async () => {
    try {
      const data = await AsyncStorage.getItem("entryList");
      const output = JSON.parse(data);
      setEntries(output);
    } catch (error) {
      console.error(error);
    }
  };

  // if coming from View Entry Screen, update entry's sets and name
  React.useEffect(() => {
    if (route.params?.exercises) {
      handleNewExercises(
        route.params.exercises,
        route.params.entryName,
        route.params.entryIndex
      );
    }
  });
  

  // if deleting entry
  React.useEffect(() => {
    if (route.params?.isDeleting) {
      handleDeleteEntry(route.params.index);
    }
  });

  // when addingEntry is true, change screen to view newest entry
  React.useEffect(() => {
    if (entries.length > 0) {
      navigation.navigate("View Entry", {
        item: entries[0],
        index: 0,
        fromHomeNew,
      });
    }
    setAddingEntry(false);
  }, [addingEntry]);

  const handleNewEntry = (newEntry) => {
    if (route.params?.entryName) {
      route.params.entryName = null;
    }
    const newEntries = [...entries];
    setEntries([
      {
        title: newEntry,
        date: currDate,
        exercises: [],
      },
      ...newEntries,
    ]);
    saveEntries();
  };

  const handleNewExercises = (exercises, entryName, index) => {
    route.params.exercises = null;
    route.params.entryIndex = null;
    route.params.entryName = null;
    const currEntry = entries[index];
    currEntry["exercises"] = exercises;
    currEntry["title"] = entryName;
    setEntries([...entries]);
    saveEntries();
  };

  const handleAddButton = () => {
    handleNewEntry();
    setAddingEntry(true);
  };

  const handleDeleteEntry = (index) => {
    route.params.isDeleting = null;
    route.params.index = null;
    const newEntries = [...entries];
    newEntries.splice(index, 1);
    setEntries(newEntries);
    saveEntries();
  };

  const fromHomeNew = " ";

  const renderItem = ({ item, index }) => {
    return <EntryItem item={item} index={index}></EntryItem>;
  };

  return (
    <NativeBaseProvider>
      <View style={styles.header}></View>
      {/* List */}
      <SafeAreaView style={styles.container}>
        {entries.length == 0 && (
          <View style={styles.noEntryContainer}>
            <Text style={styles.noEntriesText}>No Entries</Text>
          </View>
        )}

        <FlatList
          // ListHeaderComponent={()=><Text alignSelf={"center"} fontSize={24} color={"#9a9a9a"}>entries: {entries.length}</Text>}
          contentContainerStyle={{ top: 20, paddingBottom: 110 }}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          data={entries}
          renderItem={renderItem}
          extraData={isRender}
        />
      </SafeAreaView>
      {/* List */}

      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddButton()}
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
    backgroundColor: "#b19ff9",
    // backgroundColor: "#26abff",
    justifyContent: "center",
    alignItems: "center",
  },

  noEntryContainer: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  noEntriesText: {
    position: "absolute",
    top: 325,
    fontSize: 22,
    color: "#9c9c9c",
  },
});
