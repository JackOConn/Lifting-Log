import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from "native-base";
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

  exerciseLength: {
    fontSize: 12,
    marginLeft: 20,
    color: "#9c9c9c",
    paddingLeft: 10,
    bottom: 32,
  },
});
