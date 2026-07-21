import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Link href="/profile" style={styles.link}>
        Profile
      </Link>
      <Link href="/setting" style={styles.link}>
        Setting
      </Link>
      <Link href="/modal" style={styles.link}>
        Modal
      </Link>
      <Link href="/admin" style={styles.link}>
        Admin Panel
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
