import { StyleSheet, Text, View } from "react-native";
import React from "react";
import useDeviceMotion, {
  SHAKE_THRESHOLD,
  COOLDOWN_MS,
} from "@/hooks/useDeviceMotion";

const MotionDetector = () => {
  const { available, force, isShaking, shakeCount } = useDeviceMotion();

  return (
    <View style={styles.conatiner}>
      <Text style={styles.heading}>Motion Detector</Text>

      {!available ? (
        <Text style={styles.unavailableText}>
          Device Motion sensor is not available in this Device
        </Text>
      ) : (
        <>
          <View style={styles.content}>
            <Text style={styles.text}>Shake the device to trigger it</Text>
          </View>

          <View style={[styles.hero, isShaking && styles.heroActive]}>
            <Text style={styles.heroEmoji}>{isShaking ? "📳" : "📱"}</Text>
            <Text style={styles.heroLabel}>
              {isShaking ? "Shaking!" : "Shake to detect"}
            </Text>
            <Text style={styles.heroHint}>
              force {force.toFixed(1)} / {SHAKE_THRESHOLD} · {shakeCount} shakes
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default MotionDetector;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#020817",
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    color: "#f8fafc",
  },
  unavailableText: {
    color: "#e2e8f0",
    textAlign: "center",
    fontSize: 15,
  },
  content: {
    marginBottom: 20,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#cbd5e1",
    textAlign: "center",
  },
  hero: {
    width: "100%",
    maxWidth: 320,
    paddingVertical: 28,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#334155",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  heroActive: {
    backgroundColor: "#1f2937",
    borderColor: "#f87171",
    transform: [{ scale: 1.02 }],
  },
  heroEmoji: {
    fontSize: 56,
    marginBottom: 8,
  },
  heroLabel: {
    fontSize: 20,
    fontWeight: "700",
    color: "#f8fafc",
    marginBottom: 6,
  },
  heroHint: {
    fontSize: 14,
    color: "#cbd5e1",
    textAlign: "center",
  },
});
