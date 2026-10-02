import { StyleSheet, Text, View } from "react-native";
import React from "react";
import useGyroscope from "@/hooks/useGyroscope";

const TILT = 5;

const GyroCard = () => {
  const { available, x, y, z } = useGyroscope();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {available
          ? "Gyroscope"
          : " Gyroscope is not available on this device."}
      </Text>
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

      <View
        style={[
          styles.card,
          {
            transform: [
              {
                perspective: 1000,
              },
              { rotateX: `${x * TILT}deg` },
              { rotateY: `${y * TILT}deg` },
            ],
          },
        ]}
      >
        <View style={styles.cardDecor} />
        <View style={styles.cardDecorSecondary} />
        <Text style={styles.cardLabel}>Krishna Dixit</Text>
        <Text style={styles.cardNumber}>1234 8284 7487</Text>
        <Text style={styles.cardMeta}>Premium Member</Text>
      </View>
    </View>
  );
};

export default GyroCard;

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
  card: {
    width: 300,
    height: 180,
    padding: 18,
    marginTop: 98,
    backgroundColor: "rgba(117, 191, 249, 0.54)",
    borderWidth: 1,
    borderColor: "rgba(117,191,249,0.15)",
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
    justifyContent: "center",
  },
  cardDecor: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(255,255,255,0.12)",
    top: -34,
    right: -28,
  },
  cardDecorSecondary: {
    position: "absolute",
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "rgba(255,255,255,0.08)",
    bottom: -26,
    left: -16,
  },
  cardLabel: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    zIndex: 1,
  },
  cardNumber: {
    fontSize: 18,
    fontWeight: "800",
    color: "#fff",
    marginVertical: 12,
    letterSpacing: 6,
    zIndex: 1,
  },
  cardMeta: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(255,255,255,0.9)",
    zIndex: 1,
  },
});
