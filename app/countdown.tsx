// app/countdown.tsx
// পেজ ৪: Countdown to Special Day
// পরের কোনো স্পেশাল তারিখ (anniversary, next birthday ইত্যাদি) পর্যন্ত
// দিন/ঘণ্টা/মিনিট/সেকেন্ড লাইভ কাউন্ট করে দেখায়।

import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ScreenHeader from "../components/ScreenHeader";
import { colors, radius, shadow, spacing, typography } from "../theme";

// ---- এখানে তোমার স্পেশাল তারিখটা বসাও (year, monthIndex 0-based, day) ----
const TARGET_DATE = new Date(2027, 8, 25); // উদাহরণ: পরের নববর্ষ
const TARGET_LABEL = "পরের বিশেষ দিন";

function getTimeLeft(target: Date) {
  const now = new Date().getTime();
  const diff = Math.max(target.getTime() - now, 0);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, done: diff === 0 };
}

export default function CountdownScreen() {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(TARGET_DATE));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(TARGET_DATE));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = useMemo(
    () => [
      { label: "দিন", value: timeLeft.days },
      { label: "ঘণ্টা", value: timeLeft.hours },
      { label: "মিনিট", value: timeLeft.minutes },
      { label: "সেকেন্ড", value: timeLeft.seconds },
    ],
    [timeLeft],
  );

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Countdown"
        subtitle={TARGET_LABEL}
        icon="hourglass-outline"
      />

      <View style={styles.center}>
        {timeLeft.done ? (
          <Text style={styles.doneText}>দিনটা চলে এসেছে! 🎉</Text>
        ) : (
          <View style={styles.grid}>
            {units.map((unit) => (
              <View key={unit.label} style={[styles.unitBox, shadow.card]}>
                <Text style={styles.unitValue}>
                  {String(unit.value).padStart(2, "0")}
                </Text>
                <Text style={styles.unitLabel}>{unit.label}</Text>
              </View>
            ))}
          </View>
        )}
        <Text style={styles.hint}>প্রতি সেকেন্ডে আপডেট হচ্ছে</Text>
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: spacing.md,
  },
  unitBox: {
    width: 76,
    height: 90,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  unitValue: { fontSize: 30, fontWeight: "800", color: colors.gold },
  unitLabel: { ...typography.caption, marginTop: 4 },
  hint: {
    ...typography.body,
    color: colors.textFaint,
    marginTop: spacing.xl,
    fontSize: 13,
  },
  doneText: { ...typography.display, textAlign: "center" },
});
