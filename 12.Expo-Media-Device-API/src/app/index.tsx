import { router } from "expo-router";
import { View, StyleSheet, Button, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Index() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Media Device API</Text>
      <View style={styles.content}>
        <Button title="Camera" onPress={() => router.push("/camera")} />
        <Button title="Audio" onPress={() => router.push("/audio")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
  content: {
    gap: 24,
  },
});
