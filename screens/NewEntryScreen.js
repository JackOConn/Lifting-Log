import { Button, Input, NativeBaseProvider } from "native-base";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { useState } from "react";

export default function NewEntryScreen({ navigation, route }) {
  const [entry, setEntry] = useState("");

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          {/* Entry Name Input */}
          <Input
            style={styles.input}
            placeholder="Push, Pull, Legs, etc."
            size="2xl"
            maxWidth={"80%"}
            bottom={5}
            value={entry}
            onChangeText={(val) => setEntry(val)}
          />
          {/* Entry Name Input */}

          <View style={styles.buttonsContainer}>
            {/* Cancel Button */}
            <Button
              style={styles.CancelButton}
              alignSelf={"center"}
              size={"lg"}
              background={"#26abff"}
              onPress={() => navigation.navigate("Home")}
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
              disabled={!entry}
              onPress={() => navigation.navigate("Home", { entryName: entry })}
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
