// app/quiz.tsx
// পেজ ৫: Mini Quiz Game
// "আমাদের সম্পর্কে কতটা জানো" টাইপ মজার কুইজ। প্রতিটা প্রশ্নে ৪টা অপশন,
// সঠিক উত্তরে সবুজ, ভুলে লাল হাইলাইট হয়, শেষে স্কোর দেখায়।

import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ScreenHeader from "../components/ScreenHeader";
import { colors, radius, shadow, spacing, typography } from "../theme";

// ---- এখানে আসল প্রশ্নগুলো বসাও ----
type Question = {
  question: string;
  options: string[];
  correctIndex: number;
};

const QUESTIONS: Question[] = [
  {
    question: "আমাদের প্রথম দেখা হয়েছিল কোথায়?",
    options: ["কলেজে", "বন্ধুর বাসায়", "রিকশা", "অফিসে"],
    correctIndex: 2,
  },
  {
    question: "আমার সবচেয়ে প্রিয় খাবার কোনটা?",
    options: ["বিরিয়ানি", "গরুর গোশত", "ইলিশ মাছ", "পাস্তা"],
    correctIndex: 1,
  },
  {
    question: "আরবিতে 'হাসব্যান্ড' (Husband) বা স্বামীকে কী বলা হয়?",
    options: ["হাবিব (حبيب)", "জাউজ (زوج)", "রফিক (رفيق)", "সাদিক (صديق)"],
    correctIndex: 1,
  },
  {
    question:
      " রাসুলুল্লাহ (সা.)-এর হাদিস অনুযায়ী, দুনিয়ার শ্রেষ্ঠ সম্পদ বা সবচাইতে মূল্যবান উপাদান কোনটি?",
    options: [
      "অফুরন্ত ধন-সম্পদ",
      "সুন্দর ও বড় বাড়ি",
      "নেককার বা সৎ স্ত্রী (নেককার জীবনসঙ্গী)",
      "অনেক সোনা-দানা",
    ],
    correctIndex: 2,
  },
];

export default function QuizScreen() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = QUESTIONS[step];

  const handleSelect = (optIndex: number) => {
    if (selected !== null) return; // একবার সিলেক্ট করলে বদলানো যাবে না
    setSelected(optIndex);
    if (optIndex === current.correctIndex) {
      setScore((s) => s + 1);
    }

    setTimeout(() => {
      if (step + 1 < QUESTIONS.length) {
        setStep((s) => s + 1);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 700);
  };

  const restart = () => {
    setStep(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <View style={styles.container}>
        <ScreenHeader
          title="Quiz Result"
          subtitle="ফলাফল দেখো"
          icon="ribbon-outline"
        />
        <View style={styles.center}>
          <Text style={styles.resultEmoji}>🏆</Text>
          <Text style={styles.resultScore}>
            {score} / {QUESTIONS.length}
          </Text>
          <Text style={styles.resultText}>
            {score === QUESTIONS.length
              ? "দারুণ! তুমি সবটাই জানো আমাদের সম্পর্কে।"
              : "ভালো চেষ্টা! আরও কিছু মুহূর্ত একসাথে তৈরি করা বাকি।"}
          </Text>
          <TouchableOpacity style={styles.restartBtn} onPress={restart}>
            <Text style={styles.restartBtnText}>আবার খেলো</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Mini Quiz"
        subtitle={`প্রশ্ন ${step + 1} / ${QUESTIONS.length}`}
        icon="help-circle-outline"
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.questionCard, shadow.card]}>
          <Text style={styles.questionText}>{current.question}</Text>
        </View>

        {current.options.map((opt, index) => {
          const isSelected = selected === index;
          const isCorrect = index === current.correctIndex;
          let bg = colors.surface;
          if (selected !== null) {
            if (isCorrect) bg = colors.success;
            else if (isSelected) bg = colors.primaryDeep;
          }
          return (
            <TouchableOpacity
              key={index}
              style={[styles.option, { backgroundColor: bg }]}
              onPress={() => handleSelect(index)}
              activeOpacity={0.85}
              disabled={selected !== null}
            >
              <Text style={styles.optionText}>{opt}</Text>
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
  questionCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  questionText: { ...typography.h2, textAlign: "center" },
  option: {
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  optionText: { ...typography.body, fontWeight: "600", textAlign: "center" },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
  },
  resultEmoji: { fontSize: 56, marginBottom: spacing.md },
  resultScore: { fontSize: 40, fontWeight: "800", color: colors.gold },
  resultText: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: "center",
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  restartBtn: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.pill,
  },
  restartBtnText: { fontWeight: "700", color: colors.bg },
});
