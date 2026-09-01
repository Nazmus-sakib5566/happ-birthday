// app/wish-jar.tsx
// পেজ ৬: Wish Jar
// একটা virtual জার — ট্যাপ করলে র‍্যান্ডম একটা শুভকামনা animated card হয়ে
// নিচ থেকে উপরে উঠে আসে। একই wish বারবার না আসার চেষ্টা করা হয়েছে।

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

// ---- এখানে আসল উইশগুলো বসাও ----
const WISHES = [
  "তোমার এই বছরটা হাসি আর সাফল্যে ভরে উঠুক। 🌟",
  "তুমি যা চাও, সবই পূরণ হোক। 🎈",
  "তোমার পাশে সবসময় ভালো মানুষরা থাকুক। 💫",
  "তোমার স্বাস্থ্য সবসময় ভালো থাকুক। 🌿",
  "তোমার হাসি কখনো ফিকে না হোক। 😊",
  "তুমি যেখানেই যাও, ভালোবাসা তোমার সাথে যাক। ❤️",
  "আল্লাহ তাঁর পবিত্র ঘর জিয়ারত করার সুযোগ করে দেন। 🕋",
  "তোমার সব স্বপ্ন সত্যি হোক। ✨",
];

export default function WishJarScreen() {
  const [currentWish, setCurrentWish] = useState<string | null>(null);
  const [usedIndices, setUsedIndices] = useState<number[]>([]);
  const translateY = useRef(new Animated.Value(40)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const jarScale = useRef(new Animated.Value(1)).current;

  const pickWish = () => {
    let available = WISHES.map((_, i) => i).filter(
      (i) => !usedIndices.includes(i),
    );
    if (available.length === 0) {
      available = WISHES.map((_, i) => i);
      setUsedIndices([]);
    }
    const randomIndex = available[Math.floor(Math.random() * available.length)];
    setUsedIndices((prev) => [...prev, randomIndex]);
    setCurrentWish(WISHES[randomIndex]);

    // জার বাউন্স অ্যানিমেশন
    Animated.sequence([
      Animated.timing(jarScale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(jarScale, { toValue: 1, useNativeDriver: true }),
    ]).start();

    // উইশ কার্ড উপরে উঠে আসার অ্যানিমেশন
    translateY.setValue(40);
    opacity.setValue(0);
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Wish Jar"
        subtitle="জারে ট্যাপ করে একটা শুভকামনা তোলো"
        icon="gift-outline"
      />

      <View style={styles.center}>
        <TouchableOpacity onPress={pickWish} activeOpacity={0.8}>
          <Animated.View
            style={[
              styles.jar,
              shadow.glow,
              { transform: [{ scale: jarScale }] },
            ]}
          >
            <Text style={styles.jarEmoji}>🏺</Text>
            <Text style={styles.jarLabel}>ট্যাপ করো</Text>
          </Animated.View>
        </TouchableOpacity>

        {currentWish && (
          <Animated.View
            style={[
              styles.wishCard,
              shadow.card,
              { opacity, transform: [{ translateY }] },
            ]}
          >
            <Text style={styles.wishText}>{currentWish}</Text>
          </Animated.View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
  },
  jar: {
    width: 140,
    height: 140,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 2,
    borderColor: colors.gold,
    alignItems: "center",
    justifyContent: "center",
  },
  jarEmoji: { fontSize: 52 },
  jarLabel: {
    ...typography.caption,
    marginTop: spacing.sm,
    color: colors.gold,
  },
  wishCard: {
    marginTop: spacing.xl,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    minHeight: 90,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  wishText: { ...typography.body, textAlign: "center", fontSize: 16 },
});
