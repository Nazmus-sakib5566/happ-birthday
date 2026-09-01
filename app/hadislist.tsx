// app/playlist.tsx
// পেজ: উত্তম স্ত্রী — ২০টি গুরুত্বপূর্ণ হাদিস
// স্ত্রীর গুণাবলি ও স্বামীর হক নিয়ে হাদিসের লিস্ট — প্রতিটার সাথে সংক্ষিপ্ত বিবরণ।
// ট্যাপ করলে বিবরণটা expand/collapse হয়।

import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import ScreenHeader from "../components/ScreenHeader";
import { colors, radius, shadow, spacing, typography } from "../theme";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// ---- এখানে হাদিসগুলো বসানো আছে ----
// দ্রষ্টব্য: হাদিসগুলো সংক্ষেপে নিজের ভাষায় লেখা হয়েছে। publish করার আগে
// একজন আলেম বা নির্ভরযোগ্য হাদিস গ্রন্থ (যেমন hadithbd.com) থেকে সঠিক
// শব্দচয়ন ও রেফারেন্স নম্বর একবার মিলিয়ে নিও।
const HADIS = [
  {
    title: "পাঁচ ওয়াক্ত নামাজ, রোজা, ইজ্জত রক্ষা ও স্বামীর আনুগত্যে জান্নাত",
    artist: "মুসনাদ আহমাদ",
    note: "রাসুল (সা.) বলেছেন, যে নারী পাঁচ ওয়াক্ত নামাজ পড়ে, রমজানের রোজা রাখে, নিজের সতীত্ব হেফাজত করে ও স্বামীর আনুগত্য করে, তাকে বলা হবে—জান্নাতের যে দরজা দিয়ে ইচ্ছা, প্রবেশ করো",
  },
  {
    title: "স্বামীর ডাকে সাড়া দেওয়ার গুরুত্ব",
    artist: "সহিহ বুখারী ও মুসলিম",
    note: "রাসুল (সা.) বলেছেন, স্বামী স্ত্রীকে বিছানায় ডাকলে কোনো বৈধ ওজর ছাড়া অস্বীকার করলে ফেরেশতারা সকাল পর্যন্ত তার প্রতি অসন্তুষ্ট থাকেন।",
  },
  {
    title: "স্বামীর প্রতি কৃতজ্ঞতা",
    artist: "আবু দাউদ ও তিরমিযী",
    note: "রাসুল (সা.) বলেছেন, যে স্ত্রী তার স্বামীর প্রতি কৃতজ্ঞ নয়, সে প্রকৃতপক্ষে আল্লাহর প্রতিও কৃতজ্ঞ নয়।",
  },
  {
    title: "সর্বোত্তম নারীর গুণ",
    artist: "সুনানে নাসাঈ",
    note: "সাহাবীরা জিজ্ঞেস করলেন, কোন নারী সর্বোত্তম? রাসুল (সা.) বললেন, যাকে দেখলে স্বামী আনন্দিত হয়, যাকে নির্দেশ দিলে সে মেনে নেয়, আর নিজের ও স্বামীর সম্পদের ব্যাপারে অবাধ্য হয় না।",
  },
  {
    title: "ঘরের দায়িত্বও ইবাদতের মর্যাদা রাখে",
    artist: "সহিহ ইবনে খুযাইমা",
    note: "এক নারী জিজ্ঞেস করলেন, পুরুষরা জিহাদে সওয়াব পায়, নারীরা কী পাবে? রাসুল (সা.) বললেন, ঘরে থেকে দায়িত্ব পালন করাই তোমাদের জিহাদের মতো মর্যাদা রাখে।",
  },
  {
    title: "নেককার স্ত্রী দুনিয়ার সর্বোত্তম সম্পদ",
    artist: "সহিহ মুসলিম",
    note: "রাসুল (সা.) বলেছেন, দুনিয়া হলো ভোগ্যবস্তু, আর দুনিয়ার সর্বোত্তম ভোগ্যবস্তু হলো নেককার স্ত্রী।",
  },
  {
    title: "পরিবারের কাছে উত্তম হওয়া",
    artist: "সুনানে তিরমিযী",
    note: "রাসুল (সা.) বলেছেন, তোমাদের মধ্যে সর্বোত্তম সে, যে তার পরিবারের কাছে সর্বোত্তম, আর আমি আমার পরিবারের কাছে তোমাদের মধ্যে সর্বোত্তম।",
  },
  {
    title: "দাম্পত্য গোপনীয়তা রক্ষা করা",
    artist: "সহিহ মুসলিম",
    note: "রাসুল (সা.) বলেছেন, কিয়ামতের দিন আল্লাহর কাছে সবচেয়ে নিকৃষ্ট মর্যাদার একজন হবে সে, যে তার স্ত্রীর সাথে ঘনিষ্ঠতার পর সেই গোপন বিষয় অন্যদের কাছে বলে বেড়ায়।",
  },
  {
    title: "ঘর ও সন্তানের তত্ত্বাবধায়ক",
    artist: "সহিহ বুখারী ও মুসলিম",
    note: "রাসুল (সা.) বলেছেন, নারী তার স্বামীর ঘর ও সন্তানদের ব্যাপারে তত্ত্বাবধায়ক এবং এই দায়িত্ব সম্পর্কে তাকে জিজ্ঞাসা করা হবে।",
  },
  {
    title: "দ্বীনদার স্ত্রী বিয়ে করার ফজিলত",
    artist: "বায়হাকী",
    note: "রাসুল (সা.) বলেছেন বলে বর্ণিত আছে, যে ব্যক্তি দ্বীনদার নারীকে বিয়ে করল, আল্লাহ তার দ্বীনের অর্ধেক পূর্ণ করে দিলেন। বাকি অর্ধেকের জন্য তাকওয়া অবলম্বন করা উচিত।",
  },
  {
    title: "রাগের সময় সংযত থাকা",
    artist: "হাদিসের সাধারণ শিক্ষা",
    note: "রাসুল (সা.) শক্তিশালী মানুষ বলতে বুঝিয়েছেন যে রাগের সময় নিজেকে নিয়ন্ত্রণ করতে পারে। দাম্পত্য জীবনে মতভেদের সময় ধৈর্য ধরে কথা বলা এই শিক্ষারই প্রতিফলন।",
  },
  {
    title: "স্বামীর অনুপস্থিতিতে সম্মান ও সম্পদ হেফাজত",
    artist: "সূরা নিসা: ৩৪ ও হাদিসের ব্যাখ্যা",
    note: "কুরআনে বলা হয়েছে, নেককার স্ত্রীরা অনুগত হয় এবং স্বামীর অনুপস্থিতিতে আল্লাহর হেফাজতে যা রক্ষণীয় তা রক্ষা করে — অর্থাৎ নিজের সম্মান ও স্বামীর সম্পদের হেফাজত করে।",
  },
  {
    title: "নম্র ও মিষ্টভাষী হওয়া",
    artist: "হাদিসের সাধারণ শিক্ষা",
    note: "রাসুল (সা.) বলেছেন, উত্তম কথা বলাও একটি সদকা। পরিবারে নম্র ভাষায় কথা বলা ঈমানের পূর্ণতার লক্ষণ হিসেবে বর্ণিত হয়েছে।",
  },
  {
    title: "শালীনতা ও সতীত্ব রক্ষা করা",
    artist: "হাদিসের সাধারণ শিক্ষা",
    note: "ইসলামে স্ত্রীর জন্য নিজের শালীনতা ও সতীত্ব রক্ষা করাকে পারিবারিক সম্মান ও সন্তানের সুস্থ ভবিষ্যতের ভিত্তি হিসেবে গুরুত্ব দেওয়া হয়েছে।",
  },
  {
    title: "সন্তান লালন-পালনে যত্নশীল হওয়া",
    artist: "সহিহ বুখারী",
    note: "রাসুল (সা.) বলেছেন, নারী তার সন্তানদের ব্যাপারে তত্ত্বাবধায়ক এবং তাদের সঠিক লালন-পালনের জন্য জিজ্ঞাসিত হবে।",
  },
  {
    title: "স্বামীর পরিবারের সাথে সদাচরণ",
    artist: "হাদিসের সাধারণ শিক্ষা",
    note: "পারিবারিক শান্তি বজায় রাখতে স্বামীর আত্মীয়স্বজনের সাথে সদাচরণ বজায় রাখাকে উত্তম চরিত্রের একটি অংশ হিসেবে বিবেচনা করা হয়।",
  },
  {
    title: "অকৃতজ্ঞতা থেকে সতর্কতা",
    artist: "সহিহ বুখারী",
    note: "রাসুল (সা.) নারীদের সতর্ক করে বলেছেন, স্বামীর দীর্ঘদিনের ভালো ব্যবহার ভুলে গিয়ে সামান্য কষ্টে অকৃতজ্ঞ হওয়া থেকে বিরত থাকতে হবে — কারণ অকৃতজ্ঞতা আল্লাহর কাছে অপছন্দনীয়।",
  },
  {
    title: "সামর্থ্য অনুযায়ী জীবনে সন্তুষ্ট থাকা",
    artist: "হাদিসের সাধারণ শিক্ষা",
    note: "স্বামীর সাধ্যের মধ্যে জীবনযাপনে সন্তুষ্ট থাকা এবং অতিরিক্ত চাহিদা না রাখা তাকওয়া ও কৃতজ্ঞতার লক্ষণ হিসেবে বর্ণিত হয়েছে।",
  },
  {
    title: "পারস্পরিক পরামর্শে সিদ্ধান্ত নেওয়া",
    artist: "হাদিসের সাধারণ শিক্ষা",
    note: "রাসুল (সা.) নিজে পারিবারিক ও গুরুত্বপূর্ণ বিষয়ে স্ত্রীদের সাথে পরামর্শ করতেন, যা দাম্পত্য জীবনে পারস্পরিক পরামর্শের গুরুত্ব শেখায়।",
  },
  {
    title: "দাম্পত্য জীবনে বিশ্বস্ততা",
    artist: "হাদিসের সাধারণ শিক্ষা",
    note: "বিশ্বস্ততা ও আমানতদারিতাকে ইসলামে ঈমানের অংশ বলা হয়েছে, আর দাম্পত্য জীবনে এই বিশ্বস্ততাই সম্পর্কের মূল ভিত্তি হিসেবে বিবেচিত।",
  },
];

export default function PlaylistScreen() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="উত্তম স্ত্রী"
        subtitle="২০টি গুরুত্বপূর্ণ হাদিস"
        icon="heart-outline"
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {HADIS.map((hadis, index) => {
          const isOpen = expandedIndex === index;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.songCard, shadow.card]}
              onPress={() => toggle(index)}
              activeOpacity={0.85}
            >
              <View style={styles.songRow}>
                <View style={styles.songIcon}>
                  <Ionicons name="heart" size={18} color={colors.gold} />
                </View>
                <View style={styles.songInfo}>
                  <Text style={styles.songTitle}>{hadis.title}</Text>
                  <Text style={styles.songArtist}>{hadis.artist}</Text>
                </View>
                <Ionicons
                  name={isOpen ? "chevron-up" : "chevron-down"}
                  size={18}
                  color={colors.textMuted}
                />
              </View>

              {isOpen && (
                <View style={styles.noteBox}>
                  <Text style={styles.noteText}>{hadis.note}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  scrollContent: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  songCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  songRow: { flexDirection: "row", alignItems: "center" },
  songIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },
  songInfo: { flex: 1 },
  songTitle: { ...typography.h2, fontSize: 16 },
  songArtist: { ...typography.caption, marginTop: 2, textTransform: "none" },
  noteBox: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  noteText: {
    ...typography.body,
    color: colors.textMuted,
    fontStyle: "italic",
  },
});
