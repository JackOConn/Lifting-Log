import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Animated,
  LayoutAnimation
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  Input,
  AddIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "native-base";
import { v4 as uuid } from "uuid";

export const Exercise = ({ item, index }) => {
  const [expanded, setExpanded] = useState(false);
  const [weight, setWeight] = useState();
  const [reps, setReps] = useState();
  const [isRender, setisRender] = useState(false);
  const [name, setName] = useState();
  const [set, createSet] = useState();

  const layoutAnimConfig = {
    update: {
      duration: 200,
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
    create: {
      duration: 500,
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
    delete: {
      duration: 150,
      type: LayoutAnimation.Types.easeOut,
      property: LayoutAnimation.Properties.opacity,
    }
  };

  const handleAddSet = (item, weight, reps) => {
    const newSets = [...item.exerciseSets];
    weight = 135;
    reps = 12;
    item.exerciseSets = [...newSets, { setID: uuid(), weight: weight, reps: reps }];
    setisRender(!isRender);
    LayoutAnimation.configureNext(layoutAnimConfig);
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
        onPress={() => {setExpanded(!expanded); LayoutAnimation.configureNext(layoutAnimConfig)}}
      >
        <View>
          <Input
            left={15}
            width={"80%"}

            variant={"unstyled"}
            placeholder={"exercise name"}
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
            <ChevronUpIcon style={styles.chevronDown} color={"#93988a"}></ChevronUpIcon>
          ) : (
            <ChevronDownIcon style={styles.chevronDown} color={"#93988a"}></ChevronDownIcon>
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
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.addSetButton}
                  onPress={() => {handleAddSet(item)}}
                >
                  <AddIcon size={"sm"} color={"#ced9bf"}></AddIcon>
                  <Text color={"#ced9bf"} marginLeft={2} >add new set</Text>
                </TouchableOpacity>
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
  },

  item: {
    justifyContent: "center",
    backgroundColor: "#14171a",
    alignItems: "flex-start",
    borderColor: "#23292d",
    borderRadius: "0%",
    width: "100%",
    height: 90,
    borderBottomWidth: 1,
  },

  itemExpanded: {
    justifyContent: "center",
    backgroundColor: "#14171a",
    alignItems: "flex-start",
    width: "100%",
    height: 90,
  },

  item2: {
    justifyContent: "center",
    backgroundColor: "#14171a",
    alignItems: "flex-start",
    borderColor: "#23292d",
    width: "100%",
    height: 70,
    borderTopWidth: 1,
  },

  text: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 30,
    color: "#ced9bf",
    top: 4,
  },

  text2: {
    fontSize: 16,
    marginLeft: 30,
    color: "#ced9bf",
    top: 3,
  },

  setsAmount: {
    fontSize: 12,
    marginLeft: 28,
    color: "#93988a",
    top: -3,
  },

  addSetText: {
    fontSize: 16,
    color: "#fff",
    top: 3,
  },

  chevronContainer: {
    position: "absolute",
    alignSelf: "flex-end",
    right: 38,
    justifyContent: "center",
  },

  chevronDown: {
    color: "#93988a",
    alignSelf: "center",
  },

  itemAdd: {
    flexDirection: "row",
    backgroundColor: "#101010",
    borderColor: "#080808",
    width: "100%",
    height: 70,
    borderBottomColor: "#181818",
  },

  // weightInput: {
  //   alignSelf: "center",
  //   width: 100,
  //   left: 20,
  //   top: 6,
  // },

  // repsInput: {
  //   alignSelf: "center",
  //   width: 75,
  //   left: 13,
  //   top: 6,
  // },

  exerciseInput: {
    color: "#ced9bf",
    fontSize: 22,
    top: 4,
  },

  addSetButton: {
    flexDirection: "row",
    backgroundColor: "#08090a",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    borderWidth: 1.25,
    borderColor: "#303030",
    borderStyle: 'dashed',
  },
});
