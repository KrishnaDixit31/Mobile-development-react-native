import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSegments } from "expo-router";

const Login = () => {
  const segments = useSegments();
  return (
    <View>
      <Text>Login screen</Text>
      <Text>Segment = {segments.join("/")}</Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
