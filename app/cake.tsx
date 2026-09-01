import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useRouter } from "expo-router";

export default function Cake() {
  const router = useRouter();

  const [candle, setCandle] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Birthday Cake 🎂</Text>

      <Text style={styles.cake}>🎂</Text>

      {candle && <Text style={styles.fire}>🕯️ 🕯️ 🕯️</Text>}

      <TouchableOpacity style={styles.button} onPress={() => setCandle(false)}>
        <Text style={styles.buttonText}>Blow Candle 🌬️</Text>
      </TouchableOpacity>

      {!candle && (
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => router.push("/final")}
        >
          <Text style={styles.buttonText}>Cut Cake 🍰</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF5F7",
  },

  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#FF4D6D",
  },

  cake: {
    fontSize: 120,
    marginTop: 40,
  },

  fire: {
    fontSize: 35,
    marginTop: -20,
  },

  button: {
    marginTop: 40,
    backgroundColor: "#FF4D6D",
    paddingHorizontal: 35,
    paddingVertical: 15,
    borderRadius: 30,
  },

  nextButton: {
    marginTop: 20,
    backgroundColor: "#FFD700",
    paddingHorizontal: 35,
    paddingVertical: 15,
    borderRadius: 30,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
