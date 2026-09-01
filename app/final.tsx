import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

export default function Final() {
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.balloon}>🎈🎈🎈</Text>

      <Animated.View
        style={{
          transform: [
            {
              scale,
            },
          ],
        }}
      >
        <Text style={styles.fire}>🎆</Text>

        <Text style={styles.title}>Happy Birthday ❤️</Text>

        <Text style={styles.message}>
          May Allah bless you{"\n"}
          with happiness and success ✨
        </Text>
      </Animated.View>

      <Text style={styles.heart}>❤️ ❤️ ❤️</Text>

      <CustomButton title="Back Home" onPress={() => router.push("/")} />
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

  balloon: {
    fontSize: 45,
    position: "absolute",
    top: 80,
  },

  fire: {
    fontSize: 90,
    textAlign: "center",
  },

  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#FF4D6D",
    textAlign: "center",
    marginTop: 20,
  },

  message: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    color: "#555",
    lineHeight: 30,
  },

  heart: {
    fontSize: 30,
    marginTop: 40,
  },
  button: {
    marginTop: 40,
    backgroundColor: "#FF4D6D",
    paddingHorizontal: 35,
    paddingVertical: 15,
    borderRadius: 30,
  },
});
