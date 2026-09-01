// app/balloon-pop.tsx
// পেজ ১০: Balloon Pop Wishes
// কয়েকটা বেলুন নিচ থেকে ধীরে ধীরে ভেসে উপরে ওঠে। ট্যাপ করলে বেলুনটা "পপ" হয়ে
// একটা শুভকামনা মেসেজ দেখায় এবং বেলুনটা স্ক্রিন থেকে সরে যায়।

import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import { colors, spacing, radius, typography, shadow } from '../theme';

// ---- এখানে আসল উইশগুলো বসাও ----
const WISHES = [
  'তোমার হাসি সবসময় অটুট থাকুক! 🎈',
  'নতুন বছর নতুন সুযোগ নিয়ে আসুক। 🌈',
  'তুমি যা স্বপ্ন দেখো, সব পূরণ হোক। ⭐',
  'তোমার আশেপাশে সবসময় ভালোবাসা থাকুক। 💛',
  'সুস্থ থেকো, ভালো থেকো। 🌿',
  'তোমার সাথে আরও অনেক স্মৃতি তৈরি হোক। 📸',
];

const BALLOON_COLORS = [colors.primary, colors.gold, colors.primaryDeep, colors.success];

const { width, height } = Dimensions.get('window');
const BALLOON_SIZE = 70;

type Balloon = {
  id: number;
  left: number;
  color: string;
  wishIndex: number;
  translateY: Animated.Value;
  scale: Animated.Value;
  popped: boolean;
};

function makeBalloon(id: number): Balloon {
  return {
    id,
    left: Math.random() * (width - BALLOON_SIZE - spacing.lg * 2) + spacing.lg,
    color: BALLOON_COLORS[id % BALLOON_COLORS.length],
    wishIndex: Math.floor(Math.random() * WISHES.length),
    translateY: new Animated.Value(0),
    scale: new Animated.Value(1),
    popped: false,
  };
}

export default function BalloonPopScreen() {
  const [balloons, setBalloons] = useState<Balloon[]>(() =>
    Array.from({ length: 6 }, (_, i) => makeBalloon(i))
  );
  const [activeWish, setActiveWish] = useState<string | null>(null);
  const nextId = useRef(6);

  useEffect(() => {
    balloons.forEach((b) => startFloating(b));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startFloating = (balloon: Balloon) => {
    const duration = 4000 + Math.random() * 2000;
    const float = () => {
      balloon.translateY.setValue(0);
      Animated.timing(balloon.translateY, {
        toValue: -18,
        duration,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(balloon.translateY, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }).start(() => float());
      });
    };
    float();
  };

  const popBalloon = (balloon: Balloon) => {
    if (balloon.popped) return;
    balloon.popped = true;
    setActiveWish(WISHES[balloon.wishIndex]);

    Animated.sequence([
      Animated.timing(balloon.scale, { toValue: 1.3, duration: 100, useNativeDriver: true }),
      Animated.timing(balloon.scale, { toValue: 0, duration: 150, useNativeDriver: true }),
    ]).start(() => {
      // পপ হওয়া বেলুন সরিয়ে একটা নতুন বেলুন যোগ করে দিচ্ছি, যাতে খেলা চলতে থাকে
      setBalloons((prev) => {
        const filtered = prev.filter((b) => b.id !== balloon.id);
        const fresh = makeBalloon(nextId.current++);
        startFloating(fresh);
        return [...filtered, fresh];
      });
    });
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Balloon Pop" subtitle="বেলুন ফাটিয়ে শুভকামনা খুঁজে নাও" icon="balloon-outline" />

      <View style={styles.field}>
        {balloons.map((balloon) => (
          <Animated.View
            key={balloon.id}
            style={[
              styles.balloonWrap,
              {
                left: balloon.left,
                transform: [{ translateY: balloon.translateY }, { scale: balloon.scale }],
              },
            ]}
          >
            <TouchableOpacity onPress={() => popBalloon(balloon)} activeOpacity={0.7}>
              <View style={[styles.balloon, { backgroundColor: balloon.color }, shadow.card]}>
                <View style={styles.balloonShine} />
              </View>
              <View style={styles.balloonString} />
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      {activeWish && (
        <View style={[styles.wishBanner, shadow.card]}>
          <Text style={styles.wishText}>{activeWish}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  field: {
    flex: 1,
    position: 'relative',
  },
  balloonWrap: {
    position: 'absolute',
    top: height * 0.15 + Math.random() * 100,
    alignItems: 'center',
  },
  balloon: {
    width: BALLOON_SIZE,
    height: BALLOON_SIZE * 1.2,
    borderRadius: BALLOON_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  balloonShine: {
    width: 14,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.35)',
    position: 'absolute',
    top: 12,
    left: 16,
  },
  balloonString: {
    width: 1.5,
    height: 40,
    backgroundColor: colors.textFaint,
    alignSelf: 'center',
  },
  wishBanner: {
    margin: spacing.lg,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.gold,
  },
  wishText: { ...typography.body, textAlign: 'center', fontSize: 16, color: colors.text },
});
