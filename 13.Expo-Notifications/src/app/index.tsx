import { Text, View, StyleSheet, Button, Alert, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import { useEffect } from "react";

// First, set the handler that will cause the notification to show the alert
//? Configure notification behavior once at app startup(rootLayout)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function HomeScreen() {
  const notify = async () => {
    const { status } = await Notifications.requestPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "Please allow notifications to receive alerts.",
      );
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Welcome!",
        subtitle: "From Krishna",
        body: "This is your first notification.",
        data: { screen: "/pushNotification" },
        ...(Platform.OS === "ios" ? { badge: 3 } : {}),
        ...(Platform.OS === "android" ? { color: "#FF6B35" } : {}),
        vibrate: [0, 500, 200, 500],
        priority: Notifications.AndroidNotificationPriority.HIGH,
        // sticky: true,
      },
      // trigger: null,
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 2,
        // repeats: true,
      },
    });
  };

  // Register the listener only once per mounted screen
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response.notification.request.content.data;
        const screen = data?.screen;

        if (screen === "/pushNotification") {
          router.push("/pushNotification");
        }
      },
    );

    // Remove the listener when the screen unmounts
    return () => {
      subscription.remove();
    };
  }, []);

  const dismissAllNotification = async () => {
    await Notifications.dismissAllNotificationsAsync();
  };

  const cancelNotification = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Expo Notifications</Text>
      <Button title="Get Notification" onPress={notify} />
      <Button
        title="Cancel All schedule Notification"
        onPress={cancelNotification}
      />
      <Button
        title="Dismiss All Notification"
        onPress={dismissAllNotification}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 18,
  },
  text: {
    fontSize: 24,
    fontWeight: "700",
    marginVertical: 24,
  },
});
