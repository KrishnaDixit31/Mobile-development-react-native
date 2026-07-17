import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStaticNavigation } from "@react-navigation/native";

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

const MyTabs = createBottomTabNavigator({
  screens: {
    Home: HomeTab,
    Profile: ProfileTab,
  },
});

const Navigation = createStaticNavigation(MyTabs);

const StaticTabsNavigator = () => {
  return <Navigation />;
};

export default StaticTabsNavigator;
