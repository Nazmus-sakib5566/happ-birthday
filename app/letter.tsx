import { router } from "expo-router";
import React from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CustomButton from "../components/CustomButton";

export default function Letter() {
  return (
    <ImageBackground
      source={require("../assets/images/Untitled.jpg")}
      style={styles.bg}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>💌 My Letter</Text>

        <View style={styles.card}>
          <Text style={styles.text}>
            Happy Birthday ❤️
            {"\n\n"}
            Thank you for coming into my life.
            {"\n\n"}
            Every smile of yours makes my day brighter.
            {"\n\n"}I pray that Allah blesses you with happiness, good health,
            and endless success.
            {"\n\n"}I hope today becomes one of your most beautiful memories.
            {"\n\n"}
            ❤️ Forever Yours ❤️
          </Text>
        </View>
        <CustomButton
          title="Our Memories ❤️"
          onPress={() => router.push("/gallery")}
        />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 25,
  },

  title: {
    fontSize: 34,
    textAlign: "center",
    marginBottom: 25,
    fontWeight: "bold",
    color: "#fbff0d",
  },

  card: {
    borderRadius: 20,
    padding: 25,
    elevation: 8,
  },

  text: {
    fontSize: 18,
    lineHeight: 32,
    color: "#fbff11",
    textAlign: "center",
  },
  bg: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
});
