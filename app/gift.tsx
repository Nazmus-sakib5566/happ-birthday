import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";

export default function Gift() {
  const scale = useRef(new Animated.Value(1)).current;
  const [open, setOpen] = useState(false);

  const openGift = () => {
    setOpen(true);

    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.25,
        duration: 250,
        useNativeDriver: true,
      }),

      Animated.timing(scale, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        router.push("/letter");
      }, 2000);
    });
  };

  return (
    <LinearGradient colors={["#FF4D6D", "#FF8FA3"]} style={styles.container}>
      {open && (
        <ConfettiCannon
          count={150}
          origin={{
            x: 0,
            y: 0,
          }}
        />
      )}

      <Text style={styles.title}>A Special Gift For You 🎁</Text>

      <Text style={styles.sub}>Tap the gift to open your surprise.</Text>

      <Pressable onPress={openGift}>
        <Animated.Text
          style={[
            styles.gift,
            {
              transform: [{ scale }],
            },
          ]}
        >
          {open ? "🎉" : "🎁"}
        </Animated.Text>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
  },

  sub: {
    marginTop: 15,
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 30,
  },

  gift: {
    fontSize: 120,
    marginTop: 60,
  },
});
