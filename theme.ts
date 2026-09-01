// theme.ts
// একটা জায়গায় সব ডিজাইন টোকেন — কালার, স্পেসিং, শ্যাডো।
// থিম: গভীর রাতের আকাশ (plum/midnight) + ব্লাশ পিংক + গোল্ড অ্যাকসেন্ট।
// কারণ: জন্মদিনের সারপ্রাইজ = ফানুস ওড়ানো রাতের মতো ইনটিমেট আর ওয়ার্ম হওয়া উচিত,
// সাদামাটা cream/terracotta বা pure-black/neon থিম না।

export const colors = {
  bg: '#1B1023',        // গভীর প্লাম-ব্ল্যাক ব্যাকগ্রাউন্ড
  bgAlt: '#241531',      // একটু হালকা প্লাম, সেকশন আলাদা করতে
  surface: '#2E1B3B',    // কার্ড/সারফেস কালার
  surfaceAlt: '#3A2247',
  border: '#4A2E58',

  primary: '#E8A0BF',    // ব্লাশ পিংক — মূল অ্যাকসেন্ট
  primaryDeep: '#C6668F',// গাঢ় পিংক, প্রেসড স্টেট
  gold: '#F4C95D',       // গোল্ড — সেকেন্ডারি অ্যাকসেন্ট (স্টার/হাইলাইট)
  goldDeep: '#D9A93A',

  text: '#F5EDE4',       // প্রধান টেক্সট (ওয়ার্ম অফ-হোয়াইট)
  textMuted: '#B6A3C2',  // সাবটেক্সট
  textFaint: '#8A7699',

  success: '#8FD3B6',
  overlay: 'rgba(27,16,35,0.85)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 8,
  md: 16,
  lg: 24,
  pill: 999,
};

export const typography = {
  display: {
    fontSize: 32,
    fontWeight: '800' as const,
    color: colors.text,
    letterSpacing: 0.3,
  },
  h1: {
    fontSize: 26,
    fontWeight: '700' as const,
    color: colors.text,
  },
  h2: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: colors.text,
  },
  body: {
    fontSize: 15,
    fontWeight: '400' as const,
    color: colors.text,
    lineHeight: 22,
  },
  caption: {
    fontSize: 12,
    fontWeight: '500' as const,
    color: colors.textMuted,
    letterSpacing: 0.5,
    textTransform: 'uppercase' as const,
  },
};

export const shadow = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  glow: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 6,
  },
};
