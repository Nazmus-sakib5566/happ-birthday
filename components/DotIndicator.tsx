import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  total: number;
  currentIndex: number;
};

export default function DotIndicator({ total, currentIndex }: Props) {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={[styles.dot, currentIndex === index && styles.activeDot]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#F8B7C6",
    marginHorizontal: 5,
  },

  activeDot: {
    width: 26,
    backgroundColor: "#FF4D6D",
  },
});
