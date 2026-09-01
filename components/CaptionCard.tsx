import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  caption: string;
};

export default function CaptionCard({ caption }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>❤️ Memory</Text>

      <Text style={styles.caption}>{caption}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 18,
    width: 320,
    padding: 18,
    backgroundColor: "#FFFFFFDD",
    borderRadius: 20,

    shadowColor: "#FF4D6D",
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 15,
    elevation: 8,
  },

  title: {
    color: "#FF4D6D",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },

  caption: {
    fontSize: 17,
    color: "#555",
    lineHeight: 28,
    textAlign: "center",
  },
});
