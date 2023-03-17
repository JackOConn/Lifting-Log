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

  text: {
    fontWeight: "bold",
    fontSize: 22,
    marginLeft: 30,
    color: "#fff",
    top: 4,
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
    top: 4,
  },
});
