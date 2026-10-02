import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Pedometer } from "expo-sensors";

export default function App() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [currentStepCount, setCurrentStepCount] = useState(0);

  useEffect(() => {
    const subscribe = async () => {
      // 1. Check whether Pedometer is available
      const available = await Pedometer.isAvailableAsync();

      console.log("Pedometer available:", available);
      setIsAvailable(available);

      if (!available) {
        return;
      }

      // 2. Ask for permission
      const permission = await Pedometer.requestPermissionsAsync();

      console.log("Permission:", permission);

      if (!permission.granted) {
        console.log("Pedometer permission denied");
        return;
      }

      // 3. Start watching steps
      const subscription = Pedometer.watchStepCount((result) => {
        console.log("Steps:", result.steps);

        setCurrentStepCount(result.steps);
      });

      return subscription;
    };

    let subscription: any;

    subscribe().then((result) => {
      subscription = result;
    });

    // Cleanup
    return () => {
      subscription?.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Pedometer available: {String(isAvailable)}</Text>

      <Text style={styles.steps}>Steps: {currentStepCount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  steps: {
    fontSize: 30,
    marginTop: 20,
  },
});
