import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "@react-navigation/elements";
import { Link } from "@react-navigation/native";

const HomeScreen = () => {
  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 20 }}>
        HomeScreen
      </Text>
      {/* @ts-ignore */}
      <Button screen={"Details"}>Details</Button>
      {/* @ts-ignore */}
      {/* <Link screen={"Details"}>Details</Link> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
