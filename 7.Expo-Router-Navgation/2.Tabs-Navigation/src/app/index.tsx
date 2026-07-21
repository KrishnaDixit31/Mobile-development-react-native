import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Link href="/Js-Tabs" style={styles.link}>
        Js Tabs
      </Link>
      <Link href="/Native-Tabs" style={styles.link}>
        Native Tabs
      </Link>
      <Link href="/Custom-Tabs" style={styles.link}>
        Custom Tabs
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f1ff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 40,
  },
  link: {
    marginBottom: 40,
    minWidth: 200,
    paddingHorizontal: 18,
    paddingVertical: 12,
    textAlign: "center",
    backgroundColor: "#64748b",
    color: "#fff",
  },
});
