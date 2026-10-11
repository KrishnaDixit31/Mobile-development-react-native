import { Button, Platform, ScrollView, StyleSheet, Text } from "react-native";
import * as Network from "expo-network";
import { useEffect, useState } from "react";

const NetworkScreen = () => {
  const liveState = Network.useNetworkState();
  const [snapshot, setSnapshot] = useState<Network.NetworkState | null>(null);
  const [ipAddress, setIpAddress] = useState<string | null>(null);
  const [airplaneMode, setAirplaneMode] = useState<boolean | null>(null);
  const [events, setEvents] = useState<string[]>([]);

  useEffect(() => {
    const subscription = Network.addNetworkStateListener((state) => {
      const line = `${state.type ?? "UNKNOWN"} · connected=${String(state.isConnected)} · internet=${String(state.isInternetReachable)}`;
      setEvents((curr) => [line, ...curr].slice(0, 5));
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const refreshSnapshot = async () => {
    const state = await Network.getNetworkStateAsync();
    setSnapshot(state);
  };

  const refreshIp = async () => {
    try {
      const ip = await Network.getIpAddressAsync();
      setIpAddress(ip);
    } catch (error) {
      setIpAddress(error instanceof Error ? error.message : "Unavailable");
    }
  };

  const refreshAirplaneMode = async () => {
    if (Platform.OS !== "android") {
      setAirplaneMode(null);
      return;
    }
    const enabled = await Network.isAirplaneModeEnabledAsync();
    setAirplaneMode(enabled);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Network</Text>
      <Text style={styles.subText}>Type: {liveState.type ?? "unknown"}</Text>
      <Text style={styles.subText}>
        Connected: {String(liveState.isConnected)}
      </Text>
      <Text style={styles.subText}>
        Internet reachable: {String(liveState.isInternetReachable)}
      </Text>

      <Button title="Fetch one-time snapshot" onPress={refreshSnapshot} />
      {snapshot && (
        <Text style={styles.subText}>
          Snapshot: {snapshot.type} · connected={String(snapshot.isConnected)}
        </Text>
      )}

      <Button title="Get IP address" onPress={refreshIp} />
      {ipAddress && (
        <Text style={styles.subText} selectable>
          IP: {ipAddress}
        </Text>
      )}

      {Platform.OS === "android" && (
        <>
          <Button title="Check airplane mode" onPress={refreshAirplaneMode} />
          {airplaneMode !== null && (
            <Text style={styles.subText}>
              Airplane mode: {airplaneMode ? "On" : "Off"}
            </Text>
          )}
        </>
      )}

      <Text style={styles.subText}>Recent events</Text>
      {events.length === 0 ? (
        <Text style={styles.subText}>No changes yet.</Text>
      ) : (
        events.map((event, index) => (
          <Text style={styles.subText} key={index}>
            {event}
          </Text>
        ))
      )}
    </ScrollView>
  );
};

export default NetworkScreen;

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
