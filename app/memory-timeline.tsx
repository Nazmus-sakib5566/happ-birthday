// app/memory-timeline.tsx
// পেজ ১: Memory Timeline
// একসাথে কাটানো স্পেশাল মুহূর্তগুলো তারিখ অনুযায়ী একটা vertical timeline এ দেখায়।
// প্রতিটা মুহূর্ত নিজের emoji, তারিখ আর ছোট গল্প নিয়ে একটা কার্ড হিসেবে আসে।

import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ScreenHeader from "../components/ScreenHeader";
import { colors, radius, shadow, spacing, typography } from "../theme";

// ---- এখানে তোমাদের আসল মেমোরিগুলো বসাও ----
const MEMORIES = [
  {
    date: "10-MAY-2023",
    emoji: "🌸",
    title: "প্রথম দেখা",
    text: "প্রথমবার যেদিন কথা হয়েছিল, সেদিনটা আজও মনে আছে।ঝুম বৃষ্টিতে রিকশার হুড তুলে দিয়ে তোমার পাশে বসে থাকা আর সাথে ভয়ঙ্কর বজ্রপাত—এই অনুভূতি একাধারে তুমুল রোমান্টিক এবং ভীষণ রোমাঞ্চকর।",
  },
  {
    date: "10-MAY-2023",
    emoji: "☕",
    title: "প্রথম আড্ডা",
    text: "নদীর পাড়ে ঠান্ডা হাওয়ায় সেলফি তোলা, তারপর একসাথে স্যান্ডউইচ খাওয়া—আর তোমার ছবি তুলতে বারণ করা সত্ত্বেও সেই ছবি আজীবন মেমোরি হয়ে থেকে যাওয়া। উফ! এই স্মৃতিগুলো সত্যিই ভীষণ মিষ্টি আর একটু নস্টালজিক।",
  },
  {
    date: "IN FUTURE",
    emoji: "🎬",
    title: "প্রথম মুভি",
    text: "পপকর্ন শেষ, গল্প শুরু।",
  },
  {
    date: "IN FUTURE",
    emoji: "🎆",
    title: "এখনো একসাথে নতুন বছর কাটানো হয়নি ",
    text: "কাউন্টডাউনের সেকেন্ডগুলো এখনো মনে পড়ে।",
  },
  {
    date: "25-September-2026",
    emoji: "🎂",
    title: "আজকের দিন",
    text: "আরেকটা বছর, আরেকটা কারণ উদযাপনের।",
  },
];

export default function MemoryTimelineScreen() {
  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Memory Timeline"
        subtitle="আমাদের গল্পের প্রতিটা পাতা"
        icon="time-outline"
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {MEMORIES.map((item, index) => {
          const isLast = index === MEMORIES.length - 1;
          return (
            <View key={index} style={styles.row}>
              {/* বাম পাশের টাইমলাইন লাইন + ডট */}
              <View style={styles.timelineCol}>
                <View style={styles.dot}>
                  <Text style={styles.dotEmoji}>{item.emoji}</Text>
                </View>
                {!isLast && <View style={styles.line} />}
              </View>

              {/* কার্ড */}
              <View style={[styles.card, shadow.card]}>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.text}>{item.text}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const DOT_SIZE = 44;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  row: {
    flexDirection: "row",
  },
  timelineCol: {
    alignItems: "center",
    width: DOT_SIZE,
    marginRight: spacing.md,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  dotEmoji: { fontSize: 18 },
  line: {
    flex: 1,
    width: 2,
    backgroundColor: colors.border,
    marginVertical: 4,
  },
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  date: { ...typography.caption, color: colors.gold, marginBottom: 4 },
  title: { ...typography.h2, marginBottom: 4 },
  text: { ...typography.body, color: colors.textMuted },
});
