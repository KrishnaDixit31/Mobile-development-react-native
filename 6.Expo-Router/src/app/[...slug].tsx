import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const DeepDynamicRout = () => {
  const { slug } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text>
        Deep Dynamic Route path : {Array.isArray(slug) ? slug.join("/") : slug}
      </Text>
    </View>
  );
};

export default DeepDynamicRout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
