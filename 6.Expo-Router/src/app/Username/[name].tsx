import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const Username = () => {
  const { name } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Text>Username : {name}</Text>
    </View>
  );
};

export default Username;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
