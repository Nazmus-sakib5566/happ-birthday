// app/love-letters.tsx
// পেজ ২: Love Letters / Message Wall
// বন্ধ খামের গ্রিড দেখায়, ট্যাপ করলে মডালে চিঠি খুলে যায়।
// একবার খোলা চিঠির খাম "খোলা" স্টেট দেখায় (চেকমার্ক)।

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, typography, shadow } from '../theme';

// ---- এখানে আসল চিঠিগুলো বসাও ----
const LETTERS = [
  { title: 'যখন মন খারাপ থাকে', body: 'জানি জীবনটা সবসময় সহজ না। কিন্তু মনে রেখো, তুমি একা নও — আমি পাশে আছি, সবসময়।' },
  { title: 'তোমার হাসি নিয়ে', body: 'তোমার হাসিটা একদিনও পুরোনো লাগে না। প্রতিবার নতুন করে ভালো লাগে দেখতে।' },
  { title: 'ভবিষ্যতের জন্য', body: 'সামনে যত পথ বাকি, সবটা একসাথে হাঁটতে চাই। জন্মদিনে এটাই আমার সবচেয়ে বড় ইচ্ছে।' },
  { title: 'ধন্যবাদ', body: 'তুমি যেভাবে সবসময় আমার পাশে থাকো, তার জন্য ধন্যবাদ কখনো যথেষ্ট হবে না।' },
  { title: 'একটা ছোট স্বীকারোক্তি', body: 'তোমাকে নিয়ে ভাবতে ভাবতেই আমার দিনের অনেকটা সময় কেটে যায়। এটা কোনো অভিযোগ না, বরং সবচেয়ে প্রিয় অভ্যাস।' },
  { title: 'জন্মদিনের শুভকামনা', body: 'আজকের দিনটা তোমার। হাসিখুশি থাকো, ভালো থাকো — বাকিটা আমি দেখে নেব।' },
];

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - spacing.lg * 2 - spacing.md) / 2;

export default function LoveLettersScreen() {
  const [openedIndex, setOpenedIndex] = useState<number | null>(null);
  const [opened, setOpened] = useState<Set<number>>(new Set());

  const handleOpen = (index: number) => {
    setOpenedIndex(index);
    setOpened((prev) => new Set(prev).add(index));
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Love Letters"
        subtitle="একটা একটা করে খামগুলো খোলো"
        icon="mail-outline"
      />

      <ScrollView contentContainerStyle={styles.grid}>
        {LETTERS.map((letter, index) => {
          const isOpened = opened.has(index);
          return (
            <TouchableOpacity
              key={index}
              style={[styles.envelope, shadow.card]}
              onPress={() => handleOpen(index)}
              activeOpacity={0.85}
            >
              <Ionicons
                name={isOpened ? 'mail-open-outline' : 'mail-outline'}
                size={32}
                color={isOpened ? colors.gold : colors.primary}
              />
              <Text style={styles.envelopeLabel} numberOfLines={1}>
                {isOpened ? letter.title : `চিঠি ${index + 1}`}
              </Text>
              {isOpened && (
                <View style={styles.readBadge}>
                  <Ionicons name="checkmark" size={12} color={colors.bg} />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <Modal
        visible={openedIndex !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setOpenedIndex(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, shadow.card]}>
            {openedIndex !== null && (
              <>
                <Text style={styles.modalTitle}>{LETTERS[openedIndex].title}</Text>
                <Text style={styles.modalBody}>{LETTERS[openedIndex].body}</Text>
              </>
            )}
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setOpenedIndex(null)}
            >
              <Text style={styles.closeBtnText}>বন্ধ করো</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  grid: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  envelope: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    padding: spacing.sm,
  },
  envelopeLabel: {
    ...typography.caption,
    color: colors.text,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  readBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  modalCard: {
    width: '100%',
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  modalTitle: { ...typography.h1, marginBottom: spacing.sm, color: colors.gold },
  modalBody: { ...typography.body, color: colors.text },
  closeBtn: {
    marginTop: spacing.lg,
    alignSelf: 'flex-end',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },
  closeBtnText: { fontWeight: '700', color: colors.bg },
});
