import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, TouchableHighlight, LayoutAnimation } from "react-native";
import {
  Text,
  ChevronRightIcon,
  DeleteIcon,
  Center,
  Modal,
  Button,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

export const EntryItem = ({ item, index }) => {
  const [isClosed, setIsClosed] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const isDeleting = " ";

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const closeEntry = async (shouldDelete) => {
    itemRef.close();
    if (shouldDelete) {
      await delay(500);
      navigation.navigate("Home", { index, isDeleting });
    }
  };

  const renderRight = () => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            setShowModal(true);
          }}
          style={styles.swipeView}
        >
          <DeleteIcon color={"#fff"} size={"lg"}></DeleteIcon>
        </TouchableOpacity>
        <Center>
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content maxWidth="400px">
              <Modal.Header bgColor={"#404040"} borderColor={"#303030"}>
                <Text color={"#fff"} fontSize={18}>Are you sure you want to delete entry "{item.title}" done on {item.date}?</Text>
              </Modal.Header>
              <Modal.Footer bgColor={"#404040"} borderColor={"#303030"}>
                <Button.Group space={4}>
                  <Button
                    bgColor={"#606060"}
                    onPress={() => {
                      closeEntry(false);
                      setShowModal(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    bgColor={"#ff4137"}
                    onPress={() => {
                      closeEntry(true);
                      setShowModal(false);
                    }}
                  >
                    Delete
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </Center>
      </>
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
        <TouchableHighlight
          key={index}
          activeOpacity={0.5}
          underlayColor={"#141414"}
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
        </TouchableHighlight>
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
    shadowColor: "#171717",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },

  swipeView: {
    right: -20,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff4137",
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
