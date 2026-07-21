import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Link href="/profile" style={styles.link}>
        Profile
      </Link>
      <Link href="/profile/post" style={styles.link}>
        Profile Post (Nested Route)
      </Link>
      <Link href="/login" style={styles.link}>
        Login Page (Route Group)
      </Link>
      <Link href="/UserId/123" style={styles.link}>
        Dynamic Routes
      </Link>
      <Link href="/123" style={styles.link}>
        Deep Dynamic Routes1
      </Link>
      <Link href="/abc/123/2233s" style={styles.link}>
        Deep Dynamic Routes2
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
