import { Button, StyleSheet, Text, View } from "react-native";
import * as Haptics from "expo-haptics";
import { useState } from "react";

const IMPACTS = [
  { label: "Light", style: Haptics.ImpactFeedbackStyle.Light },
  { label: "Medium", style: Haptics.ImpactFeedbackStyle.Medium },
  { label: "Heavy", style: Haptics.ImpactFeedbackStyle.Heavy },
];

const NOTIFICATIONS = [
  { label: "Success", type: Haptics.NotificationFeedbackType.Success },
  { label: "Warning", type: Haptics.NotificationFeedbackType.Warning },
  { label: "Error", type: Haptics.NotificationFeedbackType.Error },
];

const hapticsScreen = () => {
  const [lastFeedback, setLastFeedback] = useState<string | null>(null);

  const run = async (label: string, action: () => Promise<void>) => {
    try {
      await action();
      setLastFeedback(label);
    } catch {
      setLastFeedback(`${label} (not supported on this device)`);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Haptics</Text>
      <Text style={styles.subText}>Selection</Text>
      <Button
        title="selectionAsync()"
        onPress={() => run("selectionAsync()", () => Haptics.selectionAsync())}
      />

      <Text style={styles.subText}>Notifications</Text>
      {NOTIFICATIONS.map((items) => (
        <Button
          key={items.label}
          title={`notificationAsync(${items.label})`}
          onPress={() =>
            run(`notificationAsync(${items.label})`, () =>
              Haptics.notificationAsync(items.type),
            )
          }
        />
      ))}

      <Text style={styles.subText}>Impacts</Text>
      {IMPACTS.map((item) => (
        <Button
          key={item.label}
          title={`impactAsync(${item.label})`}
          onPress={() =>
            run(`impactAsync(${item.label})`, () =>
              Haptics.impactAsync(item.style),
            )
          }
        />
      ))}

      {lastFeedback && (
        <Text style={styles.subText}>Last triggered: {lastFeedback}</Text>
      )}
    </View>
  );
};

export default hapticsScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    gap: 24,
    padding: 24,
    backgroundColor: "#222",
  },
  text: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },
  subText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
