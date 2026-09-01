// app/index.tsx
// Home page — অ্যাপ চালু হলে সরাসরি এইটা প্রথমে দেখা যাবে।
// এখানে সরাসরি Surprises হাব দেখানো হচ্ছে (চাইলে পরে নিজের মতো বদলে নিও)।

import { ScrollView } from "react-native";
import Home from "./Home";
import SurprisesScreen from "./surprises";

export default function Index() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <Home />
      <SurprisesScreen />
    </ScrollView>
  );
}
