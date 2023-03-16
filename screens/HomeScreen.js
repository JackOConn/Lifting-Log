import React, { useState } from "react";
import { NativeBaseProvider, Button, AddIcon } from "native-base";
import { StyleSheet, View, FlatList, SafeAreaView } from "react-native";
import { EntryItem } from "../EntryItem";

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
          <Button
            paddingRight={8}
            alignSelf={"flex-end"}
            variant={"link"}
            size={"lg"}
            onPress={() => navigation.navigate("New Entry")}
          >
            <AddIcon size={"md"} color={"#26abff"}></AddIcon>
          </Button>
          {/* Add Button */}
        </SafeAreaView>
      </View>
      {/* Header */}

      {/* List */}
      <SafeAreaView style={styles.container}>
        <FlatList
          // inverted={true}
          data={entries}
          renderItem={renderItem}
          extraData={isRender}
        />
      </SafeAreaView>
      {/* List */}
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    height: "11%",
    backgroundColor: "#151515",
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

  itemContainer: {
    flexDirection: "row",
    justifyContent: "center",
    // paddingTop: 10,
    paddingVertical: 5,
  },

  item: {
    justifyContent: "center",
    backgroundColor: "#101010",
    alignItems: "flex-start",
    borderColor: "#202020",
    borderRadius: "30%",
    width: "90%",
  },

  text: {
    marginVertical: 36,
    fontSize: 22,
    marginLeft: 20,
    color: "#fff",
    paddingLeft: 10,
    top: 10,
  },

  date: {
    fontSize: 12,
    marginLeft: 20,
    color: "#9c9c9c",
    paddingLeft: 10,
    paddingBottom: 10,
    bottom: 22,
  },

  setLength: {
    fontSize: 12,
    marginLeft: 20,
    color: "#9c9c9c",
    paddingLeft: 10,
    bottom: 32,
  },
});
