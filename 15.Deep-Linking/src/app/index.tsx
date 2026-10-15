import { Text, View, StyleSheet, Alert, Button } from "react-native";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";

export default function DeepLinkDemo() {
  const [result, setResult] = useState<WebBrowser.WebBrowserResult | null>(
    null,
  );

  const openInApp = async () => {
    const res = await WebBrowser.openBrowserAsync("https://expo.dev", {
      toolbarColor: "#208AEF",
      controlsColor: "#FFFFFF",
      enableBarCollapsing: true,
    });
    setResult(res);
  };

  const openMail = async () => {
    const url =
      "mailto:hello@example.com?subject=Hello&body=Sent%20from%20my%20app";
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      // No mail client configured (common on simulators/emulators)
      console.warn("No email client available");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Deep Link Demo</Text>
      <View style={{ padding: 18, gap: 24 }}>
        <Button title="Open expo.dev in-app" onPress={openInApp} />
        <Button title="Open mail" onPress={openMail} />
        <Text>
          {result ? `RESULT: ${JSON.stringify(result)}` : "Not opened yet"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 18,
    gap: 24,
  },
  text: {
    fontSize: 24,
    fontWeight: "600",
  },
});
