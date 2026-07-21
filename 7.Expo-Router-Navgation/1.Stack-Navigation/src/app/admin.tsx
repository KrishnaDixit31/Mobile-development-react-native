import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Admin = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Panel</Text>
    </View>
  );
};

export default Admin;

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
