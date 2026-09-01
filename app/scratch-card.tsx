// app/scratch-card.tsx
// পেজ ৮: Scratch Card Surprise
// আঙুল দিয়ে কার্ডের উপর ড্র্যাগ করলে ধীরে ধীরে ওপরের golden overlay
// অদৃশ্য হয়ে নিচের hidden মেসেজ বের হয়ে আসে (PanResponder দিয়ে drag-distance ট্র্যাক করে)।

import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import { colors, spacing, radius, typography, shadow } from '../theme';

// ---- এখানে আসল hidden মেসেজটা বসাও ----
const HIDDEN_MESSAGE = 'তুমি আমার জীবনের সবচেয়ে সুন্দর সারপ্রাইজ। শুভ জন্মদিন! 🎉';

const SCRATCH_THRESHOLD = 18; // এতগুলো ইউনিক drag point হলে পুরো কার্ড খুলে যাবে

export default function ScratchCardScreen() {
  const [scratchedPoints, setScratchedPoints] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const overlayOpacity = useRef(new Animated.Value(1)).current;
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  const registerScratch = (x: number, y: number) => {
    if (revealed) return;
    // আগের point থেকে যথেষ্ট দূরত্ব সরলেই নতুন "scratch" গোনা হবে,
    // যাতে এক জায়গায় আঙুল রাখলে অস্বাভাবিক দ্রুত না খুলে যায়
    if (lastPoint.current) {
      const dx = x - lastPoint.current.x;
      const dy = y - lastPoint.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 12) return;
    }
    lastPoint.current = { x, y };

    setScratchedPoints((prev) => {
      const next = prev + 1;
      const progress = Math.min(next / SCRATCH_THRESHOLD, 1);
      overlayOpacity.setValue(1 - progress);
      if (progress >= 1) setRevealed(true);
      return next;
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => {
        registerScratch(e.nativeEvent.locationX, e.nativeEvent.locationY);
      },
      onPanResponderMove: (e) => {
        registerScratch(e.nativeEvent.locationX, e.nativeEvent.locationY);
      },
    })
  ).current;

  const reset = () => {
    setScratchedPoints(0);
    setRevealed(false);
    lastPoint.current = null;
    overlayOpacity.setValue(1);
  };

  const progressPct = Math.min(Math.round((scratchedPoints / SCRATCH_THRESHOLD) * 100), 100);

  return (
    <View style={styles.container}>
      <ScreenHeader title="Scratch & Reveal" subtitle="আঙুল দিয়ে ঘষে দেখো" icon="sparkles-outline" />

      <View style={styles.center}>
        <View style={[styles.cardWrap, shadow.card]}>
          {/* নিচের লেয়ার — hidden মেসেজ */}
          <View style={styles.hiddenLayer}>
            <Text style={styles.hiddenText}>{HIDDEN_MESSAGE}</Text>
          </View>

          {/* উপরের লেয়ার — scratch overlay */}
          {!revealed && (
            <Animated.View
              style={[styles.overlay, { opacity: overlayOpacity }]}
              {...panResponder.panHandlers}
            >
              <Text style={styles.overlayText}>✨ এখানে ঘষো ✨</Text>
              <Text style={styles.overlayProgress}>{progressPct}%</Text>
            </Animated.View>
          )}
        </View>

        {revealed && (
          <Text style={styles.hint} onPress={reset}>
            আবার চেষ্টা করতে ট্যাপ করো
          </Text>
        )}
      </View>
    </View>
  );
}

const CARD_HEIGHT = 220;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  cardWrap: {
    width: '100%',
    height: CARD_HEIGHT,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  hiddenLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  hiddenText: {
    ...typography.h2,
    textAlign: 'center',
    color: colors.gold,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.primaryDeep,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayText: { fontSize: 16, fontWeight: '700', color: colors.bg },
  overlayProgress: { fontSize: 13, color: colors.bg, marginTop: 6, opacity: 0.8 },
  hint: {
    marginTop: spacing.lg,
    ...typography.body,
    color: colors.textMuted,
    textDecorationLine: 'underline',
  },
});
