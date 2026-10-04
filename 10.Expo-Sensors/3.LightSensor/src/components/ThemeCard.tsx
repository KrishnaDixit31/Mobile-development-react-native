import { StyleSheet, Text, View } from "react-native";
import React from "react";
import useLightSensor from "@/hooks/useLightSensor";

const color = {
  light: {
    background: "#FFF4D6",
    border: "#F2C879",
    decor: "rgba(255,183,77,0.24)",
    decorSecondary: "rgba(255,214,102,0.2)",
    text: "#493315",
    meta: "rgba(73,51,21,0.75)",
  },
  dark: {
    background: "#202A44",
    border: "#465575",
    decor: "rgba(137,164,255,0.2)",
    decorSecondary: "rgba(110,231,210,0.14)",
    text: "#F2F5FF",
    meta: "rgba(226,232,255,0.82)",
  },
};

const TARGET_VALUE = 100;

const ThemeCard = () => {
  const { available, lux } = useLightSensor();

  const isDark = lux <= TARGET_VALUE;

  const theme = isDark ? color.dark : color.light;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {available
          ? "Light Sensor"
          : " Light Sensor is not available on this device."}
      </Text>

      {available ? (
        <>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Illuminance (lux)</Text>
            <Text style={styles.metricValue}>{lux}</Text>
          </View>

          <Text style={styles.description}>
            {isDark
              ? "Low light detected — using the dark theme."
              : "Bright light or sunlight detected — using the light theme."}
          </Text>

          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.background,
                borderColor: theme.border,
              },
            ]}
          >
            <View
              style={[styles.cardDecor, { backgroundColor: theme.decor }]}
            />
            <View
              style={[
                styles.cardDecorSecondary,
                { backgroundColor: theme.decorSecondary },
              ]}
            />
            <Text style={[styles.cardLabel, { color: theme.text }]}>
              Krishna Dixit
            </Text>
            <Text style={[styles.cardNumber, { color: theme.text }]}>
              1234 8284 7487
            </Text>
            <Text style={[styles.cardMeta, { color: theme.meta }]}>
              Premium Member
            </Text>
          </View>
        </>
      ) : null}
    </View>
  );
};

export default ThemeCard;

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
  description: {
    height: 48,
    color: "#d6d6d6",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 24,
    textAlign: "center",
  },
  card: {
    width: 300,
    height: 180,
    padding: 18,
    marginTop: 98,
    borderWidth: 1,
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
    top: -34,
    right: -28,
  },
  cardDecorSecondary: {
    position: "absolute",
    width: 110,
    height: 110,
    borderRadius: 55,
    bottom: -26,
    left: -16,
  },
  cardLabel: {
    fontSize: 20,
    fontWeight: "600",
    zIndex: 1,
  },
  cardNumber: {
    fontSize: 18,
    fontWeight: "800",
    marginVertical: 12,
    letterSpacing: 6,
    zIndex: 1,
  },
  cardMeta: {
    fontSize: 14,
    fontWeight: "500",
    zIndex: 1,
  },
});
