import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import useAccelerometer from "@/hooks/useAccelerometer";

const AREA_SIZE = 300;
const MOVE = 150;
const ballRadius = 25;
const targetRadius = 15;

const AccelerometerCard = () => {
  const { available, x, y, z } = useAccelerometer();
  const [target, setTarget] = useState({ x: 100, y: 200 });
  const [score, setScore] = useState(0);
  const offsetX = x * MOVE;
  const offsetY = y * MOVE;

  const playerX = AREA_SIZE / 2 - offsetX;
  const playerY = AREA_SIZE / 2 + offsetY;

  const dx = playerX - target.x;
  const dy = playerY - target.y;

  const distance = Math.sqrt(dx ** 2 + dy ** 2);

  useEffect(() => {
    if (distance < ballRadius + targetRadius) {
      setScore((currentScore) => currentScore + 1);
      setTarget({
        x: Math.random() * 250,
        y: Math.random() * 250,
      });
    }
  }, [distance]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Accelerometer</Text>

      <View style={styles.scoreBadge}>
        <Text style={styles.scoreLabel}>SCORE</Text>
        <Text style={styles.scoreValue}>{score}</Text>
      </View>

      <View style={styles.metricRow}>
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

      {!available && (
        <Text style={styles.text}>
          Accelerometer unavailable on this device.
        </Text>
      )}

      {/* Area where the box will move */}
      <View style={styles.area}>
        <View
          style={[
            styles.playerBall,
            {
              left: playerX - ballRadius,
              top: playerY - ballRadius,
            },
          ]}
        />
        <View
          style={[
            styles.targetBall,
            {
              left: target.x - targetRadius,
              top: target.y - targetRadius,
            },
          ]}
        />
      </View>

      <Pressable
        onPress={() => {
          setScore(0);
        }}
        style={[styles.scoreBadge, { marginTop: 28 }]}
      >
        <Text style={[styles.scoreLabel, { fontSize: 16 }]}>RESET SCORE</Text>
      </Pressable>
    </View>
  );
};

export default AccelerometerCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "700",
    alignSelf: "center",
    marginBottom: 16,
  },
  scoreBadge: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 18,
    borderRadius: 18,
    backgroundColor: "#facc15",
  },
  scoreLabel: {
    color: "#422006",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
  },
  scoreValue: {
    minWidth: 24,
    color: "#422006",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  metricRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 4,
  },
  metricCard: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: "#374151",
    borderRadius: 12,
    backgroundColor: "#1f2937",
  },
  metricLabel: {
    marginBottom: 5,
    color: "#9ca3af",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },
  metricValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    fontVariant: ["tabular-nums"],
  },
  text: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 5,
  },
  area: {
    alignSelf: "center",
    marginTop: 28,
    width: AREA_SIZE,
    height: AREA_SIZE,
    borderWidth: 3,
    borderColor: "#facc15",
    borderRadius: 20,
    backgroundColor: "#111827",
    position: "relative",
    overflow: "hidden",
  },
  playerBall: {
    position: "absolute",
    width: ballRadius * 2,
    height: ballRadius * 2,
    borderRadius: 50,
    backgroundColor: "pink",
    borderWidth: 2,
    borderColor: "#fff",
    elevation: 5,
  },
  targetBall: {
    position: "absolute",
    width: targetRadius * 2,
    height: targetRadius * 2,
    borderRadius: 40,
    backgroundColor: "yellow",
    borderWidth: 2,
    borderColor: "#fff",
    elevation: 5,
  },
});
