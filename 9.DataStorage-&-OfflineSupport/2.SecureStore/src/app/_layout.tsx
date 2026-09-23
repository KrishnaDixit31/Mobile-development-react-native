import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerTitle: "🔐 SecureStore Lab",
        headerStyle: {
          backgroundColor: "#E8F1FF",
        },
      }}
    />
  );
}
