import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import ThemeCard from "@/components/ThemeCard";

export default function Index() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ThemeCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
