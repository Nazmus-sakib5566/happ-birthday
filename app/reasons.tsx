// app/reasons.tsx
// পেজ ৩: Reasons Why I Love You
// একটা কার্ড ডেক — ট্যাপ করলে পরের কারণটা animated transition এ চলে আসে।
// শেষে progress bar দেখায় কতগুলো দেখা হয়েছে।

import React, { useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ScreenHeader from "../components/ScreenHeader";
import { colors, radius, shadow, spacing, typography } from "../theme";

// ---- এখানে আসল কারণগুলো বসাও ----
const REASONS = [
  "তুমি যেভাবে সবার কথা মন দিয়ে শোনো।",
  "তোমার হাসিতে পুরো ঘর আলোকিত হয়ে যায়।",
  "তুমি ছোট ছোট জিনিসেও খুশি হতে জানো।",
  "তুমি সবসময় সততার সাথে কথা বলো।",
  "তোমার সাথে চুপচাপ বসে থাকাটাও ভালো লাগে।",
  "তুমি হার না মেনে চেষ্টা করে যাও।",
  "তুমি অন্যদের যত্ন নাও, কিন্তু নিজেরটা ভুলে যাও ।",
  "তোমার সাথে সবকিছু সহজ মনে হয়।",
];

export default function ReasonsScreen() {
  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const goNext = () => {
    if (index >= REASONS.length - 1) {
      // শেষ কার্ডে থাকলে আবার প্রথম থেকে শুরু
      animateSwap(() => setIndex(0));
      return;
    }
    animateSwap(() => setIndex((prev) => prev + 1));
  };

  const animateSwap = (updateState: () => void) => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.92,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      updateState();
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const progress = ((index + 1) / REASONS.length) * 100;

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Reasons Why"
        subtitle={`কারণ ${index + 1} / ${REASONS.length}`}
        icon="heart-outline"
      />

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      <View style={styles.center}>
        <Animated.View
          style={[
            styles.card,
            shadow.glow,
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
          ]}
        >
          <Text style={styles.quoteMark}>“</Text>
          <Text style={styles.reasonText}>{REASONS[index]}</Text>
        </Animated.View>

        <TouchableOpacity
          style={styles.nextBtn}
          onPress={goNext}
          activeOpacity={0.85}
        >
          <Text style={styles.nextBtnText}>
            {index === REASONS.length - 1 ? "আবার শুরু থেকে" : "পরের কারণ"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  progressTrack: {
    height: 4,
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: { height: "100%", backgroundColor: colors.gold },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  },
  card: {
    width: "100%",
    minHeight: 220,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  quoteMark: {
    fontSize: 48,
    color: colors.primary,
    lineHeight: 48,
    marginBottom: spacing.sm,
  },
  reasonText: {
    ...typography.h2,
    textAlign: "center",
    lineHeight: 28,
  },
  nextBtn: {
    marginTop: spacing.xl,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.pill,
  },
  nextBtnText: { fontWeight: "700", color: colors.bg, fontSize: 15 },
});
