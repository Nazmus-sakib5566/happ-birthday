import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  caption: string;
  date: string;
};

export default function MemoryCard({ title, caption, date }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.date}>{date}</Text>

      <Text style={styles.caption}>{caption}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 15,
    padding: 20,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },

  date: {
    marginTop: 5,
    fontSize: 13,
    color: "#ddd",
  },

  caption: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 22,
    color: "#fff",
  },
});
