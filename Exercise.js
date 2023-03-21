import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { Text, Input } from "native-base";

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
      <View style={styles.item2}>
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
          <Input
            left={15}
            width={"50%"}
            variant={"unstyled"}
            placeholder="exercise name"
            style={styles.exerciseInput}
            value={item.exerciseName}
            onChangeText={(val) => (item.exerciseName = val)}
          ></Input>
          <Text style={styles.setsAmount}>{item.exerciseSets.length} sets</Text>
        </View>
      </TouchableOpacity>
      <View>
        {expanded && (
          <>
            <FlatList
              data={item.exerciseSets}
              renderItem={renderItem}
              extraData={isRender}
            />
            <View style={styles.itemAdd}>
              <View style={styles.weightInput}>
                <Text color={"#fff"}>Weight</Text>
                <Input
                  value={weight}
                  keyboardType="numeric"
                  style={styles.input}
                  variant={"underlined"}
                  onChangeText={(val) => setWeight(val)}
                />
                <Text style={styles.addSetText}></Text>
              </View>
              <View style={styles.repsInput}>
                <Text color={"#fff"}>Reps</Text>
                <Input
                  keyboardType="numeric"
                  style={styles.input}
                  variant={"underlined"}
                  value={reps}
                  onChangeText={(val) => setReps(val)}
                />
                <Text style={styles.addSetText}></Text>
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
    borderRadius: "8%",
    width: "90%",
    height: 90,
  },

  item2: {
    justifyContent: "center",
    backgroundColor: "#101010",
    alignItems: "flex-start",
    borderColor: "#080808",
    // width: "100%",
    height: 70,
    borderRadius: "8%",
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
    top: -2,
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
    borderRadius: "8%",
    borderTopWidth: 2,
  },

  weightInput: {
    alignSelf: "center",
    width: 100,
    left: 20,
    top: 6,
  },

  repsInput: {
    alignSelf: "center",
    width: 75,
    left: 13,
    top: 6,
  },

  exerciseInput: {
    color: "#fff",
    fontSize: 22,
    top: 4,
  },

  addSetButton: {
    backgroundColor: "#26abff",
    // left: 38,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderRadius: "8%",
    width: 100,
    borderTopLeftRadius: "0%",
    borderBottomLeftRadius: "0%",
  },
});
