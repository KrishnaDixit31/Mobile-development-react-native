import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const DynamicRoute = () => {
  const { id } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Text>Dynamic Route User Id : {id}</Text>
    </View>
  );
};

export default DynamicRoute;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
