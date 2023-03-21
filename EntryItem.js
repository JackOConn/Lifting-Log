import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Input, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";

export const EntryItem = ({ item, index }) => {
  const navigation = useNavigation();
  const fromHome = " ";
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        key={index}
        style={styles.item}
        onPress={() => {
          navigation.navigate("View Entry", { item, index, fromHome });
        }}
      >
        <View>
          {/* <View styles={styles.inputContainer}> */}
          {/* <Input
            bottom={1}
            left={7}
            width={"40%"}
            variant={"underlined"}
            style={styles.textInput}
          ></Input> */}
          {/* </View> */}
          <Text style={styles.text}>{item.title}</Text>
          <Text style={styles.date}>{item.date}</Text>
          <Text style={styles.exerciseLength}>
            {item.exercises.length} exercises
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },

  item: {
    justifyContent: "center",
    backgroundColor: "#101010",
    alignItems: "flex-start",
    borderColor: "#202020",
    borderRadius: "8%",
    width: "90%",
    height: 100,
  },

  textInput: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    top: 6,
  },

  inputContainer: {
    left: 20,
  },

  text: {
    fontWeight: "bold",
    fontSize: 22,
    marginLeft: 30,
    color: "#fff",
    top: 6,
  },

  date: {
    fontSize: 12,
    marginLeft: 30,
    color: "#9c9c9c",
    top: 6,
  },

  exerciseLength: {
    fontSize: 12,
    marginLeft: 30,
    color: "#9c9c9c",
    top: 3,
  },
});
