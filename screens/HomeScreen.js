import React, { useEffect, useState } from "react";
import { NativeBaseProvider, AddIcon, Text } from "native-base";
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  LayoutAnimation,
} from "react-native";
import { EntryItem } from "../EntryItem";
import { TouchableOpacity } from "react-native-gesture-handler";
import { v4 as uuid } from "uuid";
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

  const saveEntries = async (entriesToSave) => {
    try {
      const output = JSON.stringify(entriesToSave);
      await AsyncStorage.setItem("entryList", output);
    } catch (error) {
      console.log(error);
    }
  };

  const getEntries = async () => {
    try {
      const data = await AsyncStorage.getItem("entryList");
      if (data != null) {
        const output = JSON.parse(data);
        setEntries(output);
      }
    } catch (error) {
      console.log("ERROR");
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
    if (entries.length > 0 && addingEntry) {
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
        id: uuid(),
        title: newEntry,
        date: currDate,
        exercises: [],
      },
      ...newEntries,
    ]);
    LayoutAnimation.configureNext(layoutAnimConfig);
    saveEntries(entries);
  };

  const handleNewExercises = (exercises, entryName, index) => {
    route.params.exercises = null;
    route.params.entryIndex = null;
    route.params.entryName = null;
    const currEntry = entries[index];
    currEntry["exercises"] = exercises;
    currEntry["title"] = entryName;
    setEntries([...entries]);
    saveEntries(entries);
  };

  const handleAddButton = () => {
    handleNewEntry();
    setAddingEntry(true);
  };

  const layoutAnimConfig = {
    update: {
      duration: 500,
      type: LayoutAnimation.Types.easeInEaseOut,
    },
    
    delete: {
      duration: 200,
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
  };

  const handleDeleteEntry = (index) => {
    route.params.isDeleting = null;
    route.params.index = null;
    const newEntries = [...entries];
    newEntries.splice(index, 1);
    setEntries(newEntries);
    LayoutAnimation.configureNext(layoutAnimConfig);
    if (entries.length == 1) {
      AsyncStorage.removeItem("entryList");
    } else {
      saveEntries(newEntries);
    }
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
          contentContainerStyle={{paddingBottom: 110 }}
          ItemSeparatorComponent={() => <View style={{ height: 0 }} />}
          keyExtractor={(item) => item.id.toString()}
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
          <AddIcon size={"md"} color={"#ced9bf"}></AddIcon>
        </TouchableOpacity>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    height: "11%",
    flexDirection: "column",
    // backgroundColor: "#2c3439",
    backgroundColor: "#08090a",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#23292d",
  },

  headerText: {
    color: "#87Ceeb",
    fontSize: 26,
  },

  container: {
    flex: 1,
    backgroundColor: "#08090a",
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
    backgroundColor: "#82b3c9",
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
    color: "#ced9bf",

  },
});
