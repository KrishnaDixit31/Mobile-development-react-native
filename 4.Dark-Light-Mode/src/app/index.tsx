import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  useColorScheme,
  Switch,
} from "react-native";

// Define our theme colors
const themes = {
  light: {
    background: "#F8FAFC",
    card: "#FFFFFF",
    text: "#0F172A",
    subtext: "#64748B",
    accent: "#6366F1",
  },
  dark: {
    background: "#0B0F19",
    card: "#151B2C",
    text: "#F8FAFC",
    subtext: "#94A3B8",
    accent: "#818CF8",
  },
};

export default function Index() {
  const systemTheme = useColorScheme(); // 'dark' | 'light' | null
  const [toggleDark, setToggleDark] = useState<boolean | null>(null);

  // Manual toggle overrides system setting
  const isDark = toggleDark !== null ? toggleDark : systemTheme === "dark";

  const theme = isDark ? themes.dark : themes.light;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={theme.background}
      />

      {/* Header */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.title, { color: theme.text }]}>
          {isDark ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </Text>
        <Text style={[styles.subTitle, { color: theme.subtext }]}>
          System preference: {systemTheme ?? "unknown"}
        </Text>
      </View>

      {/* Toggle Row */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.text }]}>
            Override system theme
          </Text>
          <Switch
            value={toggleDark ?? systemTheme === "dark"}
            onValueChange={setToggleDark}
            trackColor={{ false: "#ddd", true: theme.accent }}
            thumbColor="white"
          ></Switch>
        </View>
      </View>

      {/* Content Card */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.title, { color: theme.accent }]}>
          Themed Card 🎨
        </Text>
        <Text style={[styles.subTitle, { color: theme.subtext }]}>
          Colors adapt to dark/light mode automatically
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  card: {
    padding: 20,
    borderRadius: 16,
    shadowColor: "#0F172A",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 14,
    marginTop: 4,
  },
  label: {
    fontSize: 18,
  },
});
