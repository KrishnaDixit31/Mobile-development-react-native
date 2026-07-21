import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <Drawer
        screenOptions={{
          drawerActiveTintColor: "#6366f1",
          drawerInactiveTintColor: "#9ca3af",
          drawerStyle: { backgroundColor: "#fff", width: 240 },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Home",
            title: "Home",
            drawerIcon: ({ color }) => (
              <Ionicons name="home" size={20} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: "Profile",
            title: "Profile",
            drawerIcon: ({ color }) => (
              <Ionicons name="person" size={20} color={color} />
            ),
            headerRight: () => <DrawerToggleButton />,
          }}
        />
        <Drawer.Screen
          name="setting"
          options={{
            drawerLabel: "Setting",
            title: "Setting",
            drawerIcon: ({ color }) => (
              <Ionicons name="settings" size={20} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
