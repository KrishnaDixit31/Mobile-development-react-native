import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/HomeScreen";
import DetailsScreen from "../../screens/DetailsScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import { NavigationContainer } from "@react-navigation/native";
import { FlipInEasyX } from "react-native-reanimated";

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fb7185",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "DashBoard",
          headerStyle: {
            backgroundColor: "#475569",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

const DynamicStackNavigator = () => {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};

export default DynamicStackNavigator;

const styles = StyleSheet.create({});
