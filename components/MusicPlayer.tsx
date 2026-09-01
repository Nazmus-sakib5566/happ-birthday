import { Audio } from "expo-av";
import { useEffect } from "react";

export default function MusicPlayer() {
  useEffect(() => {
    let sound: Audio.Sound;

    async function playMusic() {
      const { sound: music } = await Audio.Sound.createAsync(
        require("../assets/music/love1.mp3"),
        {
          shouldPlay: true,
          isLooping: true,
          volume: 0.7,
        },
      );

      sound = music;
    }

    playMusic();

    return () => {
      sound?.unloadAsync();
    };
  }, []);

  return null;
}
