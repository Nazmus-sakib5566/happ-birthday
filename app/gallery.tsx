import DotIndicator from "@/components/DotIndicator";
import GalleryHeader from "@/components/GalleryHeader";
import PhotoCard from "@/components/PhotoCard";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const photos = [
  {
    id: "1",
    image: require("../assets/images/photo1-5/photo1.jpg"),
    text: "Every moment with you is special ❤️",
  },
  {
    id: "2",
    image: require("../assets/images/photo1-5/photo2.jpg"),
    text: "Your smile is my favorite view 😊",
  },
  {
    id: "3",
    image: require("../assets/images/photo1-5/photo3.jpg"),
    text: "You make my life beautiful 🌹",
  },
  {
    id: "4",
    image: require("../assets/images/photo1-5/photo4.jpg"),
    text: "Forever starts with you 💖",
  },
  {
    id: "5",
    image: require("../assets/images/photo1-5/photo5.jpg"),
    text: "Happy Birthday My Love 🎂",
  },
];

export default function Gallery() {
  const flatListRef = useRef<FlatList>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < photos.length - 1) {
        const nextIndex = currentIndex + 1;

        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });

        setCurrentIndex(nextIndex);

        // Last photo এ গেলে button show হবে
        if (nextIndex === photos.length - 1) {
          setShowButton(true);
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <LinearGradient colors={["#FFF0F5", "#FFD6E0"]} style={styles.container}>
      <GalleryHeader />

      <FlatList
        ref={flatListRef}
        data={photos}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);

          setCurrentIndex(index);

          if (index === photos.length - 1) {
            setShowButton(true);
          } else {
            setShowButton(false);
          }
        }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <PhotoCard image={item.image} caption={item.text} />

            <Text style={styles.caption}>{item.text}</Text>
          </View>
        )}
      />

      {showButton && (
        <Pressable
          style={styles.videoButton}
          onPress={() => router.push("/video")}
        >
          <Text style={styles.videoButtonText}>Watch Video 🎥</Text>
        </Pressable>
      )}

      <DotIndicator total={photos.length} currentIndex={currentIndex} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
  },

  card: {
    width,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },

  caption: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "600",
    color: "#444",
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 30,
  },

  videoButton: {
    marginBottom: 20,
    marginTop: 10,
    backgroundColor: "#4dff56",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignSelf: "center",
  },

  videoButtonText: {
    color: "#e00b0b",
    fontSize: 18,
    fontWeight: "bold",
  },
});
