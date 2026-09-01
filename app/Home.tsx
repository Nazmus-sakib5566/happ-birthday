import BackgroundMusic from "@/components/BackgroundMusic";
import CustomButton from "@/components/CustomButton";
import FloatingHearts from "@/components/FloatingHearts";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <ImageBackground
      source={require("../assets/images/Background.jpg")}
      style={styles.bg}
    >
      <BackgroundMusic />
      <LinearGradient
        colors={["rgba(0,0,0,0.35)", "rgba(255,77,109,0.65)"]}
        style={styles.overlay}
      >
        <FloatingHearts />
        <View>
          <Text style={styles.title}>Happy Birthday ❤️</Text>

          <Text style={styles.sub}>
            Today is all about you.
            {"\n"}I have a little surprise waiting...
          </Text>
          <CustomButton
            title="Open Your Surprise 🎁"
            onPress={() => router.push("/gift")}
          />
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    height: "100%",
    width: "100%",
  },

  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },

  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },

  sub: {
    marginTop: 20,
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    lineHeight: 28,
  },

  button: {
    marginTop: 50,
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 40,
  },

  buttonText: {
    color: "#FF4D6D",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
