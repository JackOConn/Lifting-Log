import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, ThreeDotsIcon, InputGroup, InputRightAddon } from "native-base";

export const Set = ({ item }) => {
  const [weight, setWeight] = useState();
  const [reps, setReps] = useState();

  React.useEffect(() => {
    setWeight(item.weight);
    setReps(item.reps);
  });

  return (
    <View style={styles.set}>
      <InputGroup
        w={{
          base: "38%",
        }}
        justifyContent={"flex-end"}
        alignSelf={"center"}
      >
        <Input
          w={{
            base: "50%",
          }}
          fontSize={22}
          keyboardType="numeric"
          color={"#ced9bf"}
          value={weight}
          borderColor={"#93988a"}
          onChangeText={(val) => {
            item.weight = val;
            setWeight(val);
          }}
        />
        <InputRightAddon
          bg={"#93988a"}
          borderColor={"#93988a"}
          children={"lbs"}
        />
      </InputGroup>
      <InputGroup
        w={{
          base: "38%",
        }}
        justifyContent={"flex-end"}
        alignSelf={"center"}
      >
        <Input
          w={{
            base: "50%",
          }}
          fontSize={22}
          keyboardType="numeric"
          color={"#ced9bf"}
          borderColor={"#93988a"}
          value={reps}
          onChangeText={(val) => {
            item.reps = val;
            setReps(val);
          }}
        />
        <InputRightAddon
          bg={"#93988a"}
          borderColor={"#93988a"}
          children={"reps"}
        />
      </InputGroup>
      <View justifyContent={"center"} alignItems={"center"} width={"25%"}>
        <ThreeDotsIcon color={"#93988a"}></ThreeDotsIcon>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  set: {
    minWidth: "100%",
    flexDirection: "row",
    backgroundColor: "#14171a",
    height: 100,
    borderTopWidth: 1,
    borderColor: "#23292d",
  },
});
