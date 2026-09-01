// app/_layout.tsx
// Expo Router-এর রুট লেআউট। এটা না থাকলে router কাজ করবে না।
// সব স্ক্রিনেই নিজের নিজের ScreenHeader আছে, তাই এখানে header লুকিয়ে রাখা হলো।

import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#1B1023' },
      }}
    />
  );
}
