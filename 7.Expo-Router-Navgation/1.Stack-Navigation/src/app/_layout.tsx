import { Stack } from "expo-router";

export default function RootLayout() {
  const IsLogin = true;
  const IsAdmin = false;

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#64748b" },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Protected guard={IsLogin}>
        <Stack.Screen name="index" options={{ title: "Home" }} />

        {/* options for profile is inside the Profile Screen 
        (without name prop) */}
        <Stack.Screen name="profile" options={{ title: "Profile" }} />

        <Stack.Screen name="setting" options={{ title: "Setting" }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", headerShown: false }}
        />

        <Stack.Protected guard={IsAdmin}>
          <Stack.Screen name="admin" options={{ title: "Admin" }} />
        </Stack.Protected>
      </Stack.Protected>
    </Stack>
  );
}

// export const unstable_settings = {
//   anchor: "index", // redirect here when guard is false
// };
