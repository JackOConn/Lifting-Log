import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  Pressable,
} from "react-native";
import { Text, ChevronRightIcon, DeleteIcon } from "native-base";
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

        <Modal
          style={styles.modalView}
          visible={showModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => {
            setShowModal(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Pressable
                style={styles.modalDelete}
                onPress={() => {
                  setShowModal(false);
                  closeEntry(true);
                }}
              >
                <Text style={styles.modalDeleteText}>Delete</Text>
              </Pressable>
              <Pressable
                style={styles.modalCancel}
                onPress={() => {
                  setShowModal(false);
                  closeEntry(false);
                }}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
          underlayColor={"#0d0f11"}
          style={isClosed ? styles.item : styles.itemOpen}
          onPress={() => {
            navigation.navigate("View Entry", { item, index, fromHome });
          }}
        >
          {/* <View style={{flexDirection: "row", flex: 1}}> */}
          <View style={styles.itemContainer}>
            <Text style={styles.text}>{item.title}</Text>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.exerciseLength}>
              {item.exercises.length}{" "}
              {item.exercises.length == 1 ? "exercise" : "exercises"}
            </Text>
            <ChevronRightIcon
              style={styles.chevron}
              color={"#93988a"}
            ></ChevronRightIcon>
          </View>
          {/* </View> */}
        </TouchableHighlight>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  item: {
    backgroundColor: "#14171a",
    width: "100%",
    height: 100,
    borderBottomWidth: 1,
    borderColor: "#23292d",
  },

  itemOpen: {
    backgroundColor: "#14171a",
    borderBottomWidth: 1,
    borderColor: "#23292d",
    width: "100%",
    height: 100,
    shadowColor: "#171717",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  swipeView: {
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff4137",
  },

  text: {
    alignSelf: "flex-start",
    fontWeight: "bold",
    fontSize: 22,
    marginLeft: 39,
    color: "#ced9bf",
    top: 6,
  },

  date: {
    alignSelf: "flex-start",
    fontSize: 12,
    marginLeft: 40,
    color: "#93988a",
    top: 5,
  },

  exerciseLength: {
    alignSelf: "flex-start",
    fontSize: 12,
    marginLeft: 40,
    color: "#93988a",
    top: 2,
  },

  chevron: {
    position: "absolute",
    alignSelf: "flex-end",
    paddingRight: 100,
  },

  modalContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },

  modalView: {
    justifyContent: "flex-end",
  },

  modalContent: {
    width: "95%",
    height: "25%",
    overflow: "hidden",
    bottom: 0,
  },

  modalDelete: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#14171a",
    height: "35%",
    width: "100%",
    borderRadius: "15%",
  },

  modalCancel: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#14171a",
    height: "35%",
    width: "100%",
    borderRadius: "15%",
    top: 8,
  },

  modalDeleteText: {
    fontWeight: "bold",
    color: "#ff4137",
    fontSize: 22,
  },

  modalCancelText: {
    fontWeight: "bold",
    color: "#82b3c9",
    fontSize: 22,
  },
});
