import { useRouter } from "expo-router";
import { VideoView, useVideoPlayer } from "expo-video";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function VideoScreen() {
  const router = useRouter();

  const player = useVideoPlayer(
    require("../assets/music/Happy_Birthday_Song.mp4"),
    (player) => {
      player.loop = false;
      player.play();
    },
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎥 Birthday Video</Text>

      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/timeline")}
      >
        <Text style={styles.buttonText}>Next ❤️</Text>
      </TouchableOpacity>
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
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF4D6D",
    marginBottom: 30,
  },

  video: {
    width: 320,
    height: 200,
    borderRadius: 25,
    overflow: "hidden",
  },

  button: {
    marginTop: 40,
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
});
