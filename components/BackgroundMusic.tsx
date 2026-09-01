import { Audio } from "expo-av";
import { useEffect } from "react";

export default function BackgroundMusic() {
  useEffect(() => {
    let sound: Audio.Sound;

    async function playMusic() {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require("../assets/music/love1.mp3"),
        {
          isLooping: true,
          volume: 0.4,
        },
      );

      sound = newSound;

      await sound.playAsync();
    }

    playMusic();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  return null;
}
