import { Button, Input, NativeBaseProvider } from "native-base";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { useState } from "react";

export default function NewSetScreen({ navigation, route }) {
  const [setName, setSetName] = useState("");
  const [reps, setReps] = useState();
  const [weight, setWeight] = useState();

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
            value={setName}
            onChangeText={(val) => setSetName(val)}
          />
          {/* Set Name Input */}

          {/* Set Reps Input */}
          <Input
            keyboardType="numeric"
            style={styles.input}
            placeholder="12"
            size="2xl"
            maxWidth={"80%"}
            bottom={5}
            value={reps}
            onChangeText={(val) => setReps(val)}
          />
          {/* Set Reps Input */}

          {/* Set Weight Input */}
          <Input
            keyboardType="numeric"
            style={styles.input}
            placeholder="135"
            size="2xl"
            maxWidth={"80%"}
            bottom={5}
            value={weight}
            onChangeText={(val) => setWeight(val)}
          />
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
              disabled={!setName || !reps || !weight}
              onPress={() =>
                navigation.navigate("View Entry", {
                  setName,
                  reps,
                  weight,
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
