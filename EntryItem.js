import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text, ChevronRightIcon } from "native-base";
import { useNavigation } from "@react-navigation/native";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

export const EntryItem = ({ item, index }) => {
  const [isClosed, setIsClosed] = useState(true);
  const isDeleting = " ";

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const closeEntry = async () => {
    itemRef.close();
    await delay(500);
    navigation.navigate("Home", { index, isDeleting });
  }
  

  const renderRight = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          closeEntry();
        }}
        style={styles.swipeView}
      >
        <Text color={"#fff"}>DELETE</Text>
      </TouchableOpacity>
    );
  };

  const navigation = useNavigation();
  const fromHome = " ";
  let itemRef;
  return (
    <GestureHandlerRootView>
      <Swipeable
        ref={(ref) => (itemRef = ref)}
        overshootFriction={30}
        renderRightActions={renderRight}
        onSwipeableWillClose={(itemRef) => setIsClosed(true)}
        onSwipeableWillOpen={(itemRef) => setIsClosed(false)}
      >
        <TouchableOpacity
          key={index}
          activeOpacity={1}
          style={isClosed ? styles.item : styles.itemOpen}
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
      </Swipeable>
    </GestureHandlerRootView>
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

  itemOpen: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#101010",
    alignItems: "flex-start",
    borderColor: "#202020",
    borderTopLeftRadius: "8%",
    borderBottomLeftRadius: "8%",
    width: "90%",
    height: 100,
    shadowColor: '#171717',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },

  swipeView: {
    right: -20,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    borderTopRightRadius: "8%",
    borderBottomRightRadius: "8%",
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
