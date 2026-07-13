import { useState } from "react";
import { Text, View, StyleSheet, Pressable, ViewStyle } from "react-native";

//* The Foundation of Styling.
function StyleSheetCreate() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>StyleSheet.create</Text>
        <Text style={styles.subtitle}>
          Use this pattern to keep your styles clean, organized, and easy to
          maintain across your React Native app.
        </Text>
      </View>
    </View>
  );
}

//* This Combines two style objects into one. Clean alternative to array syntax.
function StyleSheetCompose() {
  const [isActive, setIsActive] = useState(false);

  // Instead of style={[styles.button, styles.activeButton]}
  // You can do:
  const buttonStyle = StyleSheet.compose(
    composeStyle.button,
    isActive ? composeStyle.activeButton : null,
  );

  return (
    <View style={composeStyle.container}>
      {/* @ts-ignore */}
      <Pressable style={buttonStyle} onPress={() => setIsActive(!isActive)}>
        <Text style={composeStyle.btnText}>
          {isActive ? "Active State" : "Inactive State"}
        </Text>
      </Pressable>
    </View>
  );
}

//* This Takes an array of styles (or nested arrays) and flattens them into one plain JavaScript object.
function StyleSheetFlatten() {
  const styleA = StyleSheet.create({ text: { color: "red", fontSize: 16 } });
  const styleB = StyleSheet.create({
    text: { fontSize: 24, fontWeight: "bold" },
  });

  // Flatten merges them — later styles WIN on conflicts
  const flattenStyle = StyleSheet.flatten([styleA.text, styleB.text]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={flattenStyle}>Flattened Style!</Text>
    </View>
  );
}

export default function Index() {
  return (
    <StyleSheetCreate />
    // <StyleSheetCompose />
    // <StyleSheetFlatten />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#94a3b8",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    margin: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "888",
    marginTop: 6,
  },
});

const composeStyle = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 10,
    backgroundColor: "#000",
  },
  activeButton: {
    backgroundColor: "#6C63FF",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
