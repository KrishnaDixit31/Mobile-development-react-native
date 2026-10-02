import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import GyroCard from "@/components/GyroCard";

export default function Index() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <GyroCard />
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
