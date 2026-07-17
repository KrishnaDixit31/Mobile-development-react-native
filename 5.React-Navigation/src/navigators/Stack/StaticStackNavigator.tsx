import React from "react";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/HomeScreen";
import DetailsScreen from "../../screens/DetailsScreen";
import ProfileScreen from "../../screens/ProfileScreen";

const stack = createNativeStackNavigator({
  screens: {
    Home: { screen: HomeScreen, options: { title: "DashBoard" } },
    Details: DetailsScreen,
    Profile: ProfileScreen,
  },
});

const Navigation = createStaticNavigation(stack);

const StaticStackNavigator = () => {
  return <Navigation />;
};

export default StaticStackNavigator;
