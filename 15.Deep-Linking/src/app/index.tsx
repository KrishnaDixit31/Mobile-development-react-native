import { Text, View, StyleSheet, Alert, Button } from "react-native";
import * as Linking from "expo-linking";

export default function DeepLinkDemo() {
  const url = Linking.createURL("details/31", {
    queryParams: { ref: "Information" },
  });

  const parsed = Linking.parse(url);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Deep Link Demo</Text>
      <View style={{ padding: 18, gap: 12 }}>
        <Text>Built link:</Text>
        <Text selectable>{url}</Text>

        <Text>Path: {parsed.path}</Text>
        <Text>ref param: {String(parsed.queryParams?.ref)}</Text>

        {/* Opening your own deep link re-enters the app at that route */}
        <Button
          title="Open this deep link"
          onPress={() => Linking.openURL(url)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 18,
  },
  text: {
    fontSize: 24,
    fontWeight: "600",
  },
});
