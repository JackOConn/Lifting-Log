import { Button, Input, NativeBaseProvider } from "native-base";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { useState } from "react";

export default function NewSetScreen({ navigation, route }) {
  const [exerciseName, setExerciseName] = useState("");

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          {/* Set Name Input */}
          <Input
            style={styles.input}
            placeholder="Squat, Bench, Deadlift"
            size="2xl"
            maxWidth={"80%"}
            bottom={5}
            value={exerciseName}
            onChangeText={(val) => setExerciseName(val)}
          />
          {/* Set Name Input */}

          {/* Set Weight Input */}
          {/* <Input
            keyboardType="numeric"
            style={styles.input}
            placeholder="135"
            size="2xl"
            maxWidth={"80%"}
            bottom={5}
            value={weight}
            onChangeText={(val) => setWeight(val)}
          /> */}
          {/* Set Weight Input */}

          <View style={styles.buttonsContainer}>
            {/* Cancel Button */}
            <Button
              style={styles.CancelButton}
              alignSelf={"center"}
              size={"lg"}
              background={"#26abff"}
              onPress={() => navigation.goBack()}
            >
              Cancel
            </Button>
            {/* Cancel Button */}

            {/* Save Button */}
            <Button
              style={styles.SaveButton}
              alignSelf={"center"}
              background={"#26abff"}
              size={"lg"}
              disabled={!exerciseName}
              onPress={() =>
                navigation.navigate("View Entry", {
                  exerciseName,
                  item: route.params.item,
                  index: route.params.index,
                })
              }
            >
              Save
            </Button>
            {/* Save Button */}
          </View>
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080808",
  },

  input: {
    color: "#fff",
  },

  inputContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  CancelButton: {
    right: "2%",
  },

  SaveButton: {
    left: "2%",
  },
});
