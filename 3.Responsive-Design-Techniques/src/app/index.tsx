import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ScreenOrientation from "expo-screen-orientation";
const BASE_WIDTH = 390; // iPhone 14 base

export default function Index() {
  const { width, height, fontScale } = useWindowDimensions();
  // console.log(width, height, scale, fontScale);

  const isTablet = width >= 768;
  const isLandscape = width > height;

  // For Responsive layout, padding, sizing, etc.
  const scale = (size: number) => (width / BASE_WIDTH) * size;

  const lockLandscape = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE,
    );
  };

  const lockPortrait = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT,
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: scale(16) }}>
      <Text style={{ fontSize: width * 0.06 }}>Responsive Text 📱</Text>

      <View
        style={{ flexDirection: isTablet ? "row" : "column", marginTop: 12 }}
      >
        <View
          style={{
            width: isTablet ? width / 2 : width - 32,
            backgroundColor: "#6C63FF",
            padding: 20,
            borderRadius: 12,
            marginBottom: 12,
          }}
        >
          <Text style={{ color: "white" }}>Card 1</Text>
        </View>
        <View
          style={{
            width: isTablet ? width / 2 : width - 32,
            backgroundColor: "#FF6584",
            padding: 20,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: "white" }}>Card 2</Text>
        </View>
      </View>

      <Text style={{ color: "#888", marginTop: 16 }}>
        Screen: {Math.round(width)} × {Math.round(height)}
        {isLandscape ? " (Landscape)" : " (Portrait)"}
      </Text>

      <View
        style={{
          flexDirection: isLandscape ? "row" : "column",
          marginTop: 24,
          gap: 12,
        }}
      >
        <Pressable
          onPress={lockLandscape}
          style={{
            flex: isLandscape ? 1 : undefined,
            padding: 12,
            borderRadius: 8,
            backgroundColor: "#6C63FF",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 16 * fontScale }}>
            Force Landscape
          </Text>
        </Pressable>
        <Pressable
          onPress={lockPortrait}
          style={{
            flex: isLandscape ? 1 : undefined,
            padding: 12,
            borderRadius: 8,
            backgroundColor: "#6C63FF",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 16 * fontScale }}>
            Force Portrait
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
