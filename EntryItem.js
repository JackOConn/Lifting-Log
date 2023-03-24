import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text, ChevronRightIcon } from "native-base";
import { useNavigation } from "@react-navigation/native";

export const EntryItem = ({ item, index }) => {
  const navigation = useNavigation();
  const fromHome = " ";
  return (
    <View>
      <TouchableOpacity
        key={index}
        activeOpacity={0.7}
        style={styles.item}
        onPress={() => {
          navigation.navigate("View Entry", { item, index, fromHome });
        }}
      >
        <View style={styles.itemContainer}>
          <Text style={styles.text}>{item.title}</Text>
          <Text style={styles.date}>{item.date}</Text>
          <Text style={styles.exerciseLength}>
            {item.exercises.length}{" "}
            {item.exercises.length == 1 ? "exercise" : "exercises"}
          </Text>
          <ChevronRightIcon style={styles.chevron}></ChevronRightIcon>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },

  item: {
    alignSelf: "center",
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
    marginLeft: 29,
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

  chevron: {
    position: "absolute",
    left: 300,
  },
});
