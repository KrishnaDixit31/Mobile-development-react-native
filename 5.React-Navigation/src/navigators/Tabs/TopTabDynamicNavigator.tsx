import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

function HomeTab() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Home Tab</Text>
    </View>
  );
}

function ReelsTab() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Reels Tab</Text>
    </View>
  );
}

function ProfileTab() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Profile Tab</Text>
    </View>
  );
}

const TopTab = createMaterialTopTabNavigator();

function MyTab() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <TopTab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "bold",
          },
          tabBarIndicatorStyle: {
            backgroundColor: "tomato",
            height: 3,
          },
          // swipeEnabled: false,
          lazy: true,
          tabBarScrollEnabled: true,
        }}
      >
        <TopTab.Screen name="Home" component={HomeTab} />
        <TopTab.Screen name="Reels" component={ReelsTab} />
        <TopTab.Screen name="Profile" component={ProfileTab} />
      </TopTab.Navigator>
    </SafeAreaView>
  );
}

const TopTabDynamicNavigator = () => {
  return (
    <NavigationContainer>
      <MyTab />
    </NavigationContainer>
  );
};

export default TopTabDynamicNavigator;

const styles = StyleSheet.create({});
