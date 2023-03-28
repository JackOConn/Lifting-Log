import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Animated,
} from "react-native";
import {
  Text,
  Input,
  AddIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "native-base";

export const Exercise = ({ item, index }) => {
  const [expanded, setExpanded] = useState(false);
  const [weight, setWeight] = useState();
  const [reps, setReps] = useState();
  const [isRender, setisRender] = useState(false);
  const [name, setName] = useState();

  const handleAddSet = (item, weight, reps) => {
    const newSets = [...item.exerciseSets];
    item.exerciseSets = [...newSets, { weight: weight, reps: reps }];
    setReps(null);
    setWeight(null);
  };

  React.useEffect(() => {
    let counter = 0;
    if (counter == 0) {
      setName(item.exerciseName);
      counter++;
    }
  });

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
        style={expanded ? styles.itemExpanded : styles.item}
        onPress={() => setExpanded(!expanded)}
      >
        <View>
          <Input
            left={15}
            width={"50%"}
            variant={"unstyled"}
            placeholder="exercise name"
            style={styles.exerciseInput}
            value={name}
            onChangeText={(val) => {
              item.exerciseName = val;
              setName(val);
            }}
          ></Input>
          <Text style={styles.setsAmount}>
            {item.exerciseSets.length}
            {item.exerciseSets.length == 1 ? " set" : " sets"}
          </Text>
        </View>
        <View style={styles.chevronContainer}>
          {expanded ? (
            <ChevronUpIcon style={styles.chevronDown}></ChevronUpIcon>
          ) : (
            <ChevronDownIcon style={styles.chevronDown}></ChevronDownIcon>
          )}
        </View>
      </TouchableOpacity>
      <Animated.View>
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
                  style={
                    !weight || !reps
                      ? styles.addSetButton
                      : styles.addSetButtonActive
                  }
                  disabled={!weight || !reps}
                  onPress={() => handleAddSet(item, weight, reps)}
                >
                  <AddIcon size={"sm"} color={"#fff"}></AddIcon>
                  {/* <Text>ADD</Text> */}
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </Animated.View>
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

  itemExpanded: {
    justifyContent: "center",
    backgroundColor: "#101010",
    alignItems: "flex-start",
    borderColor: "#202020",
    borderTopLeftRadius: "8%",
    borderTopRightRadius: "8%",
    width: "90%",
    height: 90,
  },

  item2: {
    justifyContent: "center",
    backgroundColor: "#101010",
    alignItems: "flex-start",
    borderColor: "#080808",
    width: "100%",
    height: 70,
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
    marginLeft: 28,
    color: "#9c9c9c",
    top: -3,
  },

  addSetText: {
    fontSize: 16,
    color: "#fff",
    top: 3,
  },

  input: {
    color: "#fff",
  },

  chevronContainer: {
    position: "absolute",
    alignSelf: "flex-end",
    right: 38,
    // height: 40,
    // width: 40,
    // borderRadius: "50%",
    // backgroundColor: "#303030",
    justifyContent: "center",
  },

  chevronDown: {
    color: "#9c9c9c",
    alignSelf: "center",
  },

  itemAdd: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#101010",
    borderColor: "#080808",
    width: 350,
    height: 70,
    borderBottomLeftRadius: "8%",
    borderBottomRightRadius: "8%",
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
    backgroundColor: "#9c9c9c",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: 100,
    borderBottomRightRadius: "8%",
  },

  addSetButtonActive: {
    backgroundColor: "#b19ff9",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: 100,
    borderBottomRightRadius: "8%",
  },
});
