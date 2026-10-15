import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as BackgroundTask from "expo-background-task";
import * as TaskManager from "expo-task-manager";

const TASK_NAME = "sync-data-task";

const syncData = async () => {
  try {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=5",
    );

    const data = await res.json();
    console.log("Fetched", data.length, "items");

    return data.length;
  } catch (error) {
    console.log(error);
  }
};

TaskManager.defineTask(TASK_NAME, async () => {
  try {
    console.log("Background task started...");
    await syncData();
    return BackgroundTask.BackgroundTaskResult.Success;
  } catch (error) {
    console.log("Task Failed", error);
    return BackgroundTask.BackgroundTaskResult.Failed;
  }
});

const registerBgTask = async () => {
  await BackgroundTask.registerTaskAsync(TASK_NAME, {
    minimumInterval: 15, // minutes
  });
};

const unregisterBgTask = async () => {
  await BackgroundTask.unregisterTaskAsync(TASK_NAME);
};

export default function BackgroundScreen() {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [status, setStatus] =
    useState<BackgroundTask.BackgroundTaskStatus | null>(null);
  const [devResult, setDevResult] = useState<string | null>(null);

  const update = async () => {
    const currentStatus = await BackgroundTask.getStatusAsync();
    setStatus(currentStatus);

    const register = await TaskManager.isTaskRegisteredAsync(TASK_NAME);
    setIsRegistered(register);
  };

  useEffect(() => {
    update();
  }, []);

  const handleRegisterTask = async () => {
    try {
      await registerBgTask();
      await update();
      Alert.alert("Background task", "Task registered successfully");
    } catch (error) {
      console.log("Register error:", error);
      Alert.alert("Background task", "Registration failed");
    }
  };

  const handleUnregisterTask = async () => {
    try {
      await unregisterBgTask();
      await update();
      Alert.alert("Background task", "Task unregistered successfully");
    } catch (error) {
      console.log("Unregister error:", error);
      Alert.alert("Background task", "Unregistration failed");
    }
  };

  // DEV ONLY: demo the output instantly without waiting for the OS scheduler.
  //  1) Runs the same logic in the foreground and shows the result on screen.
  //  2) Pokes the real native worker (debug builds only; physical device on iOS)
  //     so you can confirm the headless path actually fires.
  async function testInDev() {
    try {
      const count = await syncData();

      setDevResult(
        `Synced ${count} items at ${new Date().toLocaleTimeString()}`,
      );

      // No-op in production; requires the task to be registered first.
      const triggered = await BackgroundTask.triggerTaskWorkerForTestingAsync();

      console.log("Native worker triggered:", triggered);
    } catch (error) {
      setDevResult(
        `Failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Background task status: {status ?? "unknown"}</Text>
      <Text>{isRegistered ? "Registered" : "Not registered"}</Text>
      <Button
        title={isRegistered ? "Unregister task" : "Register task"}
        onPress={isRegistered ? handleUnregisterTask : handleRegisterTask}
      />

      {__DEV__ ? (
        <>
          <View style={{ height: 20 }} />

          <Button
            title="▶ Test Task Now (dev)"
            color="#6E56CF"
            onPress={testInDev}
          />

          {devResult ? <Text style={styles.devResult}>{devResult}</Text> : null}
        </>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 18,
  },
  devResult: {
    textAlign: "center",
    marginHorizontal: 20,
  },
});
