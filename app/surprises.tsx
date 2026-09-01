// app/surprises.tsx
// হাব পেজ — নতুন ১০টা সারপ্রাইজ ফিচারের গ্রিড মেনু।
// বিদ্যমান নেভিগেশনে (যেমন gift.tsx থেকে) এই স্ক্রিনে একটা বাটন/লিংক যোগ করলেই
// এখান থেকে ব্যবহারকারী সবগুলো নতুন পেজে যেতে পারবে।

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, radius, shadow, spacing, typography } from "../theme";

const SURPRISES: {
  route: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  {
    route: "/memory-timeline",
    title: "Memory Timeline",
    subtitle: "আমাদের গল্পের পাতা",
    icon: "time-outline",
  },
  {
    route: "/love-letters",
    title: "Love Letters",
    subtitle: "খাম খুলে চিঠি পড়ো",
    icon: "mail-outline",
  },
  {
    route: "/reasons",
    title: "Reasons Why",
    subtitle: "কারণ কার্ড দেখো",
    icon: "heart-outline",
  },
  {
    route: "/countdown",
    title: "Countdown",
    subtitle: "পরের স্পেশাল দিন",
    icon: "hourglass-outline",
  },
  {
    route: "/quiz",
    title: "Mini Quiz",
    subtitle: "কতটা জানো আমাদের",
    icon: "help-circle-outline",
  },
  {
    route: "/wish-jar",
    title: "Wish Jar",
    subtitle: "জার থেকে উইশ তোলো",
    icon: "gift-outline",
  },
  {
    route: "/photo-puzzle",
    title: "Photo Puzzle",
    subtitle: "ছবি সাজিয়ে ফেলো",
    icon: "extension-puzzle-outline",
  },
  {
    route: "/scratch-card",
    title: "Scratch & Reveal",
    subtitle: "ঘষে সারপ্রাইজ বের করো",
    icon: "sparkles-outline",
  },
  {
    route: "/hadislist",
    title: "Hadis List",
    subtitle: "গুরুত্বপূর্ণ হাদিসসমূহ",
    icon: "book-outline",
  },
  {
    route: "/balloon-pop",
    title: "Balloon Pop",
    subtitle: "বেলুন ফাটাও",
    icon: "balloon-outline",
  },
];

export default function SurprisesScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={typography.display}>Surprises 🎁</Text>
        <Text style={styles.subtitle}>
          তোমার জন্য ১০টা ছোট্ট সারপ্রাইজ, একটা একটা করে খুলে দেখো
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        {SURPRISES.map((item) => (
          <TouchableOpacity
            key={item.route}
            style={[styles.card, shadow.card]}
            activeOpacity={0.85}
            onPress={() => router.push(item.route as any)}
          >
            <View style={styles.iconWrap}>
              <Ionicons name={item.icon} size={24} color={colors.gold} />
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: {
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  grid: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    minHeight: 120,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  cardTitle: { ...typography.h2, fontSize: 15 },
  cardSubtitle: {
    ...typography.caption,
    textTransform: "none",
    marginTop: 4,
    color: colors.textMuted,
  },
});
