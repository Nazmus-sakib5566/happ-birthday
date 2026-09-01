import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, Text } from "react-native";

const { width, height } = Dimensions.get("window");

const FloatingHearts = () => {
  const hearts = [...Array(12)].map(() => ({
    x: Math.random() * width,
    delay: Math.random() * 5000,
    duration: 5000 + Math.random() * 3000,
  }));

  return (
    <>
      {hearts.map((heart, index) => (
        <Heart
          key={index}
          x={heart.x}
          delay={heart.delay}
          duration={heart.duration}
        />
      ))}
    </>
  );
};

type HeartProps = {
  x: number;
  delay: number;
  duration: number;
};

const Heart = ({ x, delay, duration }: HeartProps) => {
  const translateY = useRef(new Animated.Value(height)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),

        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -100,
            duration,
            useNativeDriver: true,
          }),

          Animated.timing(opacity, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.heart,
        {
          left: x,
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <Text style={styles.text}>❤️</Text>
    </Animated.View>
  );
};

export default FloatingHearts;

const styles = StyleSheet.create({
  heart: {
    position: "absolute",
    bottom: -50,
  },

  text: {
    fontSize: 28,
  },
});
