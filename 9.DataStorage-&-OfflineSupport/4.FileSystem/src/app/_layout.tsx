import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerTitle: "📁 Expo FileSystem Lab",
        headerStyle: {
          backgroundColor: "#E8F1FF",
        },
      }}
    />
  );
}
