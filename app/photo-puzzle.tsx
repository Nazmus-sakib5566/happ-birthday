// app/abcd.tsx
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ScreenHeader from "../components/ScreenHeader";
import { colors, radius, shadow, spacing, typography } from "../theme";

// ---- ৯টা আলাদা ছবি — order অনুযায়ী (index 0 = top-left ... index 8 = bottom-right) ----
const PUZZLE_IMAGES = [
  require("../assets/images/photo/tile-1.jpg"), // I
  require("../assets/images/photo/tile-2.jpg"), // L
  require("../assets/images/photo/tile-4.jpg"), // U
  require("../assets/images/photo/tile-5.jpg"), // D
  require("../assets/images/photo/tile-6.jpg"), // U
  require("../assets/images/photo/tile-7.jpg"), // L
  require("../assets/images/photo/tile-8.jpg"), // O
  require("../assets/images/photo/tile-9.jpg"), // N
  require("../assets/images/photo/heart.jpg"), // Heart
];

const GRID = 3; // 3x3
const { width } = Dimensions.get("window");
const BOARD_SIZE = width - spacing.lg * 2;
const TILE_SIZE = BOARD_SIZE / GRID;

function shuffle(arr: number[]): number[] {
  // Fisher-Yates shuffle — সব tile-ই এলোমেলো হবে, কোনো tile fixed/empty না
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  // যদি হুবহু সলভড অবস্থায় শাফল হয়ে যায়, আবার শাফল করো
  const isSolved = a.every((val, idx) => val === idx);
  return isSolved ? shuffle(arr) : a;
}

export default function PhotoPuzzleScreen() {
  const initial = Array.from({ length: GRID * GRID }, (_, i) => i);
  const [tiles, setTiles] = useState<number[]>(initial);
  const [selected, setSelected] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    resetPuzzle();
  }, []);

  const resetPuzzle = () => {
    setTiles(shuffle(initial));
    setSelected(null);
    setMoves(0);
    setSolved(false);
  };

  const handleTilePress = (position: number) => {
    if (solved) return;

    if (selected === null) {
      setSelected(position); // প্রথম tile সিলেক্ট করলাম
      return;
    }
    if (selected === position) {
      setSelected(null); // একই tile আবার ট্যাপ করলে ডিসিলেক্ট
      return;
    }

    // দুইটা tile সোয়াপ করো
    const next = [...tiles];
    [next[selected], next[position]] = [next[position], next[selected]];
    setTiles(next);
    setSelected(null);
    setMoves((m) => m + 1);

    const isSolved = next.every((val, idx) => val === idx);
    if (isSolved) setSolved(true);
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Photo Puzzle"
        subtitle={`Moves: ${moves}`}
        icon="extension-puzzle-outline"
      />

      <View style={styles.center}>
        <View style={[styles.board, shadow.card]}>
          {tiles.map((imageIndex, position) => (
            <TouchableOpacity
              key={position}
              style={[
                styles.tile,
                selected === position && styles.tileSelected,
              ]}
              activeOpacity={0.8}
              onPress={() => handleTilePress(position)}
            >
              <Image
                source={PUZZLE_IMAGES[imageIndex]}
                style={styles.tileImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </View>

        {solved && (
          <Text style={styles.solvedText}>🎉 তুমি পাজলটা সলভ করেছ!</Text>
        )}

        <TouchableOpacity style={styles.resetBtn} onPress={resetPuzzle}>
          <Text style={styles.resetBtnText}>
            {solved ? "আবার খেলো" : "শাফল করো"}
          </Text>
        </TouchableOpacity>
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
  board: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: radius.md,
    overflow: "hidden",
    backgroundColor: colors.surface,
  },
  tile: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    borderWidth: 0.5,
    borderColor: colors.bg,
  },
  tileSelected: {
    borderWidth: 3,
    borderColor: colors.gold,
  },
  tileImage: {
    width: "100%",
    height: "100%",
  },
  solvedText: {
    ...typography.h2,
    color: colors.gold,
    marginTop: spacing.lg,
    textAlign: "center",
  },
  resetBtn: {
    marginTop: spacing.lg,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.pill,
  },
  resetBtnText: { fontWeight: "700", color: colors.bg },
});
