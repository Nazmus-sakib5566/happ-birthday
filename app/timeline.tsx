import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useRouter } from "expo-router";

export default function Timeline() {
  const router = useRouter();

  const memories = [
    {
      year: "2023 ❤️",
      title: "First Meet",
      emoji: "🌸",
    },
    {
      year: "2024 ✨",
      title: "Best Moments",
      emoji: "💖",
    },
    {
      year: "2025 🎂",
      title: "Birthday Celebration",
      emoji: "🎉",
    },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.pictureButton}
        onPress={() => router.push("/pictures")}
      >
        <Text style={styles.pictureText}>Picture 📸</Text>
      </TouchableOpacity>
      <Text style={styles.heading}>Our Memories ❤️</Text>

      <View style={styles.line} />

      {memories.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.emoji}>{item.emoji}</Text>

          <View>
            <Text style={styles.year}>{item.year}</Text>

            <Text style={styles.title}>{item.title}</Text>
          </View>
        </View>
      ))}

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/cake")}
      >
        <Text style={styles.buttonText}>Next 🎂</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5F7",
    padding: 25,
    justifyContent: "center",
  },

  heading: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#FF4D6D",
    textAlign: "center",
    marginBottom: 40,
  },

  line: {
    position: "absolute",
    height: 300,
    width: 3,
    backgroundColor: "#FFD6E0",
    left: 45,
    top: 180,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 25,
    marginBottom: 20,
    marginLeft: 20,
    elevation: 5,
  },

  emoji: {
    fontSize: 35,
    marginRight: 20,
  },

  year: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF4D6D",
  },

  title: {
    fontSize: 17,
    marginTop: 5,
    color: "#555",
  },

  button: {
    alignSelf: "center",
    marginTop: 20,
    backgroundColor: "#FF4D6D",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  pictureButton: {
    marginBottom: 20,
    backgroundColor: "#16d42f",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
  },

  pictureText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
