import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Input, InputGroup, InputRightAddon, DeleteIcon } from "native-base";
import { COLORS } from "../colors";
import { useNavigation } from "@react-navigation/native";

export const Set = ({ set, index, exercise, entryIndex }) => {
  const [weight, setWeight] = useState();
  const [reps, setReps] = useState();
  const deletingSet = " ";
  const navigation = useNavigation();

  React.useEffect(() => {
    setWeight(set.weight);
    setReps(set.reps);
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
          color={COLORS.white}
          value={weight}
          borderColor={COLORS.gray}
          onChangeText={(val) => {
            set.weight = val;
            setWeight(val);
          }}
        />
        <InputRightAddon
          bg={COLORS.gray}
          borderColor={COLORS.gray}
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
          color={COLORS.white}
          borderColor={COLORS.gray}
          value={reps}
          onChangeText={(val) => {
            set.reps = val;
            setReps(val);
          }}
        />
        <InputRightAddon
          bg={COLORS.gray}
          borderColor={COLORS.gray}
          children={"reps"}
        />
      </InputGroup>
      <View justifyContent={"center"} alignItems={"center"} width={"25%"}>
        <Pressable
          onPress={() => {
            navigation.navigate("View Entry", {
              setIndex: index,
              index: entryIndex,
              deletingSet,
              exercise,
            });
          }}
          height={"50%"}
          width={"50%"}
          justifyContent={"center"}
          alignItems={"center"}
          // backgroundColor={"#fff"}
        >
          <DeleteIcon color={COLORS.red}></DeleteIcon>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  set: {
    minWidth: "100%",
    flexDirection: "row",
    backgroundColor: COLORS.dark_gray,
    height: 100,
    borderTopWidth: 1,
    borderColor: COLORS.black,
  },
});
