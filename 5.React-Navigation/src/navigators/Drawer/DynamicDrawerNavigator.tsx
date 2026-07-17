import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

function HomeScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
      }}
    >
      <Text>Home</Text>

      <Button title="Open Drawer" onPress={() => navigation.openDrawer()} />
      <Button
        title="Go Profile"
        onPress={() => navigation.navigate("Profile")}
      />
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: "right",
        drawerType: "front",
        drawerStyle: { width: 280 },
        overlayColor: "rgba(0,0,0,0.4)",
        sceneStyle: { backgroundColor: "#fff" },
        swipeMinDistance: 50,
        swipeEdgeWidth: 30,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: "Dashboard",
          headerLeft: () => (
            <Button title="Menu" onPress={() => navigation.openDrawer()} />
          ),
        })}
      />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

const DynamicDrawerNavigator = () => {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
};

export default DynamicDrawerNavigator;

const styles = StyleSheet.create({});
