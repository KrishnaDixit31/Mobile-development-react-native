import { View, Text, StyleSheet, Button } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

export default function DetailsScreen() {
  const { id, ref } = useLocalSearchParams<{
    id: string;
    ref?: string;
  }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details Page</Text>

      <Text>Item ID: {id}</Text>
      <Text>Reference: {ref ?? "None"}</Text>

      <Button title="Go Home" onPress={() => router.replace("/")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 15,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
