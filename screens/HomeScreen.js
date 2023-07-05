import React, { useEffect, useState } from "react";
import { CalendarList } from "react-native-calendars";
import { COLORS } from "../colors";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation, route }) {
  const current = new Date();
  const fromHome = " ";
  const fromHomeNew = " ";
  const [entries, setEntries] = useState([]);
  const [addingEntry, setAddingEntry] = useState(false);
  const [lowerRange, setLowerRange] = useState(0);
  let earliestDate = "";

  //gets called on app laod, fetch's entries & calculates lowerRange for calendar
  useEffect(() => {
    async function tempFunction() {
      await getEntries();
    }
    tempFunction();

    return () => {};
  }, []);

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
      console.error(error);
    }
  };

  //marks all dates that have entries
  let mark = {};
  entries.map((entry) => {
    mark[entry.id] = {
      selected: true,
      selectedColor: COLORS.purple,
    };
  });

  //calculates how many months in the past to show for calendar
  useEffect(() => {
    let dates = entries.map((entry) => entry.id);
    if (dates.length > 0) {
      earliestDate = dates.reduce(function (pre, cur) {
        return Date.parse(pre) > Date.parse(cur) ? cur : pre;
      });
      earliestDate = new Date(earliestDate);
      setLowerRange(
        current.getMonth() -
          earliestDate.getMonth() +
          12 * (current.getFullYear() - earliestDate.getFullYear())
      );
    }
  }, [entries]);

  React.useEffect(() => {
    if (route.params?.exercises) {
      // if coming from View Entry Screen, update entry's sets and name
      handleNewExercises(
        route.params.exercises,
        route.params.entryName,
        route.params.entryIndex
      );
    } else if (route.params?.isDeleting) {
      // if deleting entry
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

  const handleAddButton = (day) => {
    // if user clicks on a date with no entry
    if (!entries.find((entry) => entry.id == day.dateString)) {
      handleNewEntry(day);
      setAddingEntry(true);
    } else {
      let idx = entries.findIndex((entry) => entry.id == day.dateString);
      let currEntry = entries.find((entry) => entry.id == day.dateString);
      navigation.navigate("View Entry", {
        item: currEntry,
        index: idx,
        fromHome,
      });
    }
  };

  const handleNewEntry = (newEntry) => {
    if (route.params?.entryName) {
      route.params.entryName = null;
    }
    const newEntries = [...entries];
    setEntries([
      {
        id: newEntry["dateString"],
        title: "",
        exercises: [],
      },
      ...newEntries,
    ]);
    saveEntries(entries);
  };

  const handleDeleteEntry = (index) => {
    route.params.isDeleting = null;
    route.params.index = null;
    const newEntries = [...entries];
    newEntries.splice(index, 1);
    setEntries(newEntries);
    if (entries.length == 1) {
      AsyncStorage.removeItem("entryList");
    } else {
      saveEntries(newEntries);
    }
  };

  //used for testing
  const clearStorage = async () => {
    // AsyncStorage.clear();
    const newEntries = [...entries];
    setEntries([
      {
        id: "2023-05-01",
        title: "",
        exercises: [],
      },
      ...newEntries,
    ]);
    saveEntries(entries);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <CalendarList
          theme={{
            calendarBackground: COLORS.black,
            dayTextColor: COLORS.white,
            monthTextColor: COLORS.white,
          }}
          horizontal={false}
          futureScrollRange={1}
          pastScrollRange={lowerRange}
          onDayPress={(day) => {
            handleAddButton(day);
          }}
          markedDates={mark}
        ></CalendarList>
      </SafeAreaView>

      {/* <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => clearStorage()}
        ></TouchableOpacity>
      </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    height: "11%",
    flexDirection: "column",
    backgroundColor: COLORS.black,
    // backgroundColor: "blue",
    justifyContent: "center",
    borderBottomWidth: 1,
    // borderColor: "#23292d",
  },

  headerText: {
    color: "#87Ceeb",
    fontSize: 26,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.black,
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
    backgroundColor: COLORS.purple,
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
    color: COLORS.gray,
  },

  calendarDatesStyle: {
    color: COLORS.white,
  },
});
