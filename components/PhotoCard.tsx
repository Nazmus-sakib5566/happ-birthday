import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import LikeButton from "./LikeButton";

type Props = {
  image: any;
  caption: string;
};

export default function PhotoCard({ image, caption }: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <Image source={image} style={styles.image} contentFit="cover" />

        <Pressable style={styles.button}>
          <LikeButton />
        </Pressable>
        <View style={styles.overlay}>
          <Text style={styles.caption}>{caption}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    width: 330,
    height: 400,
    borderRadius: 30,
    overflow: "hidden",
    marginTop: 20,

    backgroundColor: "#fff",

    shadowColor: "#FF4D6D",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.25,
    shadowRadius: 18,

    elevation: 12,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  button: {
    position: "absolute",
    top: 15,
    right: 15,

    width: 50,
    height: 50,

    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.9)",

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#FF4D6D",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 8,
  },

  overlay: {
    position: "absolute",
    bottom: 0,

    width: "100%",

    padding: 25,

    backgroundColor: "rgba(0,0,0,.35)",
  },

  caption: {
    color: "#fff",
    fontSize: 22,
    textAlign: "center",
    fontWeight: "700",
  },
});
