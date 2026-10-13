import { StyleSheet, Text, View } from "react-native";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { useState } from "react";

const PushNotification = () => {
  const [output, setOutput] = useState<string>("");
  async function getPushToken() {
    try {
      if (
        !Constants.easConfig?.projectId &&
        !Constants.expoConfig?.extra?.eas?.projectId
      ) {
        throw new Error("EAS project ID nahi mila");
      }

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "Default",
          importance: Notifications.AndroidImportance.MAX,
        });
      }

      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();

      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        console.log("Notification permission denied");
        return;
      }

      const projectId =
        Constants.easConfig?.projectId ??
        Constants.expoConfig?.extra?.eas?.projectId;

      const token = (await Notifications.getExpoPushTokenAsync({ projectId }))
        .data;

      setOutput(token);
      console.log(token);
    } catch (error) {
      setOutput(error instanceof Error ? error.message : String(error));
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>PushNotification</Text>
      <View style={styles.outputCard}>
        <Text selectable style={styles.output}>
          {output || "Token will appear here"}
        </Text>
      </View>
    </View>
  );
};

export default PushNotification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 18,
  },
  text: {
    fontSize: 24,
    fontWeight: "700",
    marginVertical: 24,
  },
  outputCard: {
    width: "90%",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f2f2f2",
    borderWidth: 1,
    borderColor: "#d9d9d9",
  },
  output: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
});
