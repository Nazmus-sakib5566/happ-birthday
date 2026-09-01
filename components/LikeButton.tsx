import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useRef, useState } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);

  const scale = useRef(new Animated.Value(1)).current;

  const handleLike = () => {
    setLiked(!liked);

    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.4,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Pressable onPress={handleLike} style={styles.button}>
      <Animated.View
        style={{
          transform: [{ scale }],
        }}
      >
        <Ionicons
          name={liked ? "heart" : "heart-outline"}
          size={50}
          color="#FF4D6D"
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 15,
    right: 15,

    width: 45,
    height: 45,

    borderRadius: 25,
    backgroundColor: "#FFFFFFDD",

    justifyContent: "center",
    alignItems: "center",

    elevation: 5,
  },
});
