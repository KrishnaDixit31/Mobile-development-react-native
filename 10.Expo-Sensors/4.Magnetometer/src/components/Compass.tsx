import { StyleSheet, Text, View } from "react-native";
import React from "react";
import useMagnetometer from "@/hooks/useMagnetometer";

const COMPASS_RING_SIZE = 260;

const Compass = () => {
  const { available, x, y, z, heading } = useMagnetometer();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Magnetometer</Text>

      {!available ? (
        <Text style={styles.heading}>
          Magnetometer sensor is not available in this Device
        </Text>
      ) : (
        <>
          <View style={styles.content}>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>X</Text>
              <Text style={styles.metricValue}>{x.toFixed(2)}</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Y</Text>
              <Text style={styles.metricValue}>{y.toFixed(2)}</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Z</Text>
              <Text style={styles.metricValue}>{z.toFixed(2)}</Text>
            </View>
          </View>

          <View style={styles.compassRing}>
            <Text style={[styles.text, styles.east]}>E</Text>
            <Text style={[styles.text, styles.north]}>N</Text>
            <Text style={[styles.text, styles.west]}>W</Text>
            <Text style={[styles.text, styles.south]}>S</Text>
            <View
              style={[
                styles.needle,
                {
                  transform: [
                    { translateY: -(COMPASS_RING_SIZE - 120) / 2 },
                    { translateX: -9 },
                    { rotate: `${heading}deg` },
                  ],
                },
              ]}
            >
              <View style={styles.whiteNeedle} />
              <View style={styles.redNeedle} />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default Compass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 24,
    textAlign: "center",
    alignSelf: "center",
  },
  content: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 16,
  },
  metricCard: {
    minWidth: 90,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  metricLabel: {
    fontSize: 14,
    color: "#d6d6d6",
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  metricValue: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "700",
  },
  compassRing: {
    width: COMPASS_RING_SIZE,
    height: COMPASS_RING_SIZE,
    borderRadius: COMPASS_RING_SIZE / 2,
    marginTop: 48,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.66)",
    position: "relative",
    overflow: "hidden",
  },
  text: {
    position: "absolute",
    fontSize: 28,
    fontWeight: "700",
    textTransform: "uppercase",
    color: "#fff",
    zIndex: 1,
  },
  east: {
    top: "50%",
    right: 12,
    transform: [{ translateY: -18 }],
  },
  north: {
    top: 12,
    left: "50%",
    color: "red",
    transform: [{ translateX: -10 }],
  },
  west: {
    top: "50%",
    left: 12,
    transform: [{ translateY: -18 }],
  },
  south: {
    bottom: 12,
    left: "50%",
    transform: [{ translateX: -8 }],
  },
  needle: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
  redNeedle: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 70,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#ef4444",
  },
  whiteNeedle: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 70,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#e2e8f0",
  },
});
