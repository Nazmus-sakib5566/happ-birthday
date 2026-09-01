import React from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { useRouter } from "expo-router";

const pictures = [
  {
    id: "1",
    image: require("../assets/images/picture1-10/picture1.jpg"),
  },
  {
    id: "2",
    image: require("../assets/images/picture1-10/picture2.jpg"),
  },
  {
    id: "3",
    image: require("../assets/images/picture1-10/picture3.jpg"),
  },
  {
    id: "4",
    image: require("../assets/images/picture1-10/picture4.jpg"),
  },
  {
    id: "5",
    image: require("../assets/images/picture1-10/picture5.jpg"),
  },
  {
    id: "6",
    image: require("../assets/images/picture1-10/picture6.jpg"),
  },
  {
    id: "7",
    image: require("../assets/images/picture1-10/picture7.jpg"),
  },
  {
    id: "8",
    image: require("../assets/images/picture1-10/picture8.jpg"),
  },
  {
    id: "9",
    image: require("../assets/images/picture1-10/picture9.jpg"),
  },
  {
    id: "10",
    image: require("../assets/images/picture1-10/picture10.jpg"),
  },
];

export default function Pictures() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Just for you my ❤️</Text>

      <FlatList
        data={pictures}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Image source={item.image} style={styles.image} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5F7",
    padding: 20,
  },

  backButton: {
    backgroundColor: "#FF4D6D",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignSelf: "flex-start",
    marginBottom: 20,
  },

  backText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FF4D6D",
    textAlign: "center",
    marginBottom: 25,
  },

  image: {
    width: 150,
    height: 150,
    margin: 10,
    borderRadius: 20,
  },
});
