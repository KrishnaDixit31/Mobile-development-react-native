import { Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

function HomeTab() {
  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 20 }}>
        HomeTab
      </Text>
    </View>
  );
}
function ProfileTab() {
  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 20 }}>
        ProfileTab
      </Text>
    </View>
  );
}
function SearchTab() {
  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 20 }}>
        SearchTab
      </Text>
    </View>
  );
}

const BottomTab = createBottomTabNavigator();

function MyTabs() {
  return (
    <BottomTab.Navigator
      initialRouteName="Search"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icon =
            route.name === "Home"
              ? focused
                ? "home"
                : "home-outline"
              : route.name === "Search"
                ? focused
                  ? "search"
                  : "search-outline"
                : focused
                  ? "person"
                  : "person-outline";
          return <Ionicons name={icon} color={color} size={size} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeTab}
        options={{ title: "Dashboard", tabBarLabel: "Start" }}
      />
      <BottomTab.Screen name="Search" component={SearchTab} />
      <BottomTab.Screen
        name="Profile"
        component={ProfileTab}
        options={{ tabBarBadge: 3 }}
      />
    </BottomTab.Navigator>
  );
}

const DynamicTabsNavigator = () => {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
};

export default DynamicTabsNavigator;
