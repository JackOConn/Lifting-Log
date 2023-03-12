import {
  Button,
  NativeBaseProvider,
  AddIcon,
  ArrowBackIcon,
} from "native-base";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";

export default function ViewEntryScreen({ navigation, route }) {
  const [isRender, setisRender] = useState(false);
  const [sets, setSets] = useState([]);

  // new set added
  React.useEffect(() => {
    if (route.params?.setName) {
      handleNewSet(route.params.setName, route.params.reps, route.params.weight, "");
    }
  });

  // if route is from Home Screen, populate sets
  React.useEffect(() => {
    if (route.params?.fromHome) {
      route.params.fromHome = null;
      setSets(route.params.item.sets);
    }
  });

  const handleNewSet = (setName, setReps, setWeight, setDesc) => {
    route.params.setName = null;
    const newSets = [...sets];
    setSets([
      ...newSets,
      {
        setName: setName,
        setReps: setReps,
        setDesc: setDesc,
        setWeight: setWeight
      },
    ]);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          key={index}
          style={styles.item}
          onPress={() => {
            // Go to set info screen, w/ editable text
          }}
        >
          <View>
            <Text style={styles.text}>{item.setName}</Text>
            <Text style={styles.reps}>{item.setReps} reps @ {item.setWeight} lbs.</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
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
                sets,
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
      <SafeAreaView style={styles.container}>
        <FlatList
          // inverted={true}
          data={sets}
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
    flex: 1,
    backgroundColor: "#080808",
    paddingBottom: 0.12,
  },

  titleAndDateContainer: {
    height: "11%",
    backgroundColor: "#080808",
  },

  itemContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 1,
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

  item: {
    justifyContent: "center",
    backgroundColor: "#101010",
    alignItems: "flex-start",
    borderColor: "#202020",
    borderRadius: "30%",
    width: "90%",
    // height: 100,
  },

  text: {
    marginVertical: 36,
    fontSize: 22,
    marginLeft: 20,
    color: "#fff",
    paddingLeft: 10,
    top: 4,
  },

  reps: {
    fontSize: 12,
    marginLeft: 20,
    color: "#9c9c9c",
    paddingLeft: 10,
    paddingBottom: 10,
    bottom: 26,
  },
});
