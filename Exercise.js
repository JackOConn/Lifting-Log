import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Column, Text, Input } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";

export const Exercise = ({ item, index }) => {
  const [expanded, setExpanded] = useState(false);
  const [weight, setWeight] = useState();
  const [reps, setReps] = useState();
  const [isRender, setisRender] = useState(false);

  const handleAddSet = (item, weight, reps) => {
    const newSets = [...item.exerciseSets];
    item.exerciseSets = [...newSets, { weight: weight, reps: reps }];
    setReps(null);
    setWeight(null);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item2} activeOpacity={0.7}>
        <Text style={styles.text2}>
          {item.reps} reps @ {item.weight} lbs.{" "}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        activeOpacity={0.7}
        key={index}
        style={styles.item}
        onPress={() => setExpanded(!expanded)}
      >
        <View>
          <Text style={styles.text}>{item.exerciseName}</Text>
          <Text style={styles.setsAmount}>{item.exerciseSets.length} sets</Text>
        </View>
      </TouchableOpacity>
      <View>
        {expanded && (
          <>
            <SafeAreaView>
              <FlatList
                data={item.exerciseSets}
                renderItem={renderItem}
                extraData={isRender}
              />
            </SafeAreaView>
            <View style={styles.itemAdd}>
              <View style={styles.weightInput}>
                <Text color={"#fff"}>Weight</Text>
                <Input
                  value={weight}
                  keyboardType="numeric"
                  style={styles.input}
                  variant={"underlined"}
                  onChangeText={(val) => setWeight(val)}
                >
                  <Text style={styles.addSetText}></Text>
                </Input>
              </View>
              <View style={styles.repsInput}>
                <Text color={"#fff"}>Reps</Text>
                <Input
                  value={reps}
                  keyboardType="numeric"
                  style={styles.input}
                  variant={"underlined"}
                  onChangeText={(val) => setReps(val)}
                >
                  <Text style={styles.addSetText}></Text>
                </Input>
              </View>
              <View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.addSetButton}
                  disabled={!weight || !reps}
                  onPress={() => handleAddSet(item, weight, reps)}
                >
                  <Text>ADD</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
  },

  item: {
    justifyContent: "center",
    backgroundColor: "#101010",
    alignItems: "flex-start",
    borderColor: "#202020",
    borderRadius: "0%",
    width: "90%",
    height: 90,
  },

  item2: {
    justifyContent: "center",
    backgroundColor: "#101010",
    alignItems: "flex-start",
    borderColor: "#080808",
    width: 350,
    height: 70,
    borderRadius: "0%",
    borderTopWidth: 2,
  },

  text: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 30,
    color: "#fff",
    top: 4,
  },

  text2: {
    fontSize: 16,
    marginLeft: 30,
    color: "#fff",
    top: 3,
  },

  setsAmount: {
    fontSize: 12,
    marginLeft: 30,
    color: "#9c9c9c",
    top: 4,
  },

  addSetText: {
    fontSize: 16,
    // alignSelf: "center",
    // marginLeft: 30,
    color: "#fff",
    top: 3,
  },

  dropDownContainer: {
    flexDirection: "column",
    width: "100%",
  },

  input: {
    color: "#fff",
  },

  itemAdd: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    backgroundColor: "#101010",
    borderColor: "#080808",
    width: 350,
    height: 70,
    borderRadius: "0%",
    borderTopWidth: 2,
  },

  weightInput: {
    alignSelf: "center",
    width: 100,
    left: 20,
    top: -3,
  },

  repsInput: {
    alignSelf: "center",
    width: 75,
    left: 13,
    top: -3,
  },

  addSetButton: {
    backgroundColor: "#26abff",
    // left: 38,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: 100,
  },
});
