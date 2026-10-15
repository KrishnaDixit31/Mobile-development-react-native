import { Text, View, StyleSheet, Alert, Button } from "react-native";
import * as Linking from "expo-linking";

export default function DeepLinkDemo() {
  // Key point: openURL("https://…") leaves your app and opens the external browser. If you want the page to open inside your app, use expo-web-browser
  const open = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Can't Open this link", url);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ padding: 24, gap: 12 }}>
        {/* Opens the SYSTEM browser (leaves your app) */}
        <Button title="Open website" onPress={() => open("https://expo.dev")} />

        {/* Phone dialer */}
        <Button
          title="Call support"
          onPress={() => open("tel:+919999999999")}
        />

        {/* Email app */}
        <Button
          title="Email us"
          onPress={() => open("mailto:hi@example.com?subject=Hello")}
        />

        {/* Maps */}
        <Button
          title="Open in Maps"
          onPress={() => open("https://maps.google.com/?q=Mumbai")}
        />

        {/* Your app's own settings page in OS settings */}
        <Button title="App settings" onPress={() => Linking.openSettings()} />
      </View>
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
