import React from "react";
import { StyleSheet, Text, View } from "react-native";

const GalleryHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Beautiful</Text>

      <Text style={styles.memory}>Memories ❤️</Text>

      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.heart}>♥</Text>
        <View style={styles.line} />
      </View>

      <Text style={styles.subtitle}>
        Every moment with you is my favorite ✨
      </Text>
    </View>
  );
};

export default GalleryHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#8A2D4D",
  },

  memory: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#FF4D6D",
    marginTop: -5,
  },

  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },

  line: {
    width: 80,
    height: 2,
    backgroundColor: "#F6A5B7",
  },

  heart: {
    marginHorizontal: 10,
    color: "#FF4D6D",
    fontSize: 18,
  },

  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 25,
  },
});
