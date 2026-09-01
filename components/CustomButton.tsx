import React from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

type Props = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
};

const CustomButton = ({ title, onPress }: Props) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#c56495",
    paddingVertical: 16,
    paddingHorizontal: 35,
    borderRadius: 35,
    alignItems: "center",
    elevation: 5,
    marginTop: 20,
  },

  text: {
    color: "#b6da74f3",
    fontSize: 18,
    fontWeight: "700",
  },
});
