import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Setting = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Setting</Text>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f1ff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 40,
  },
});
