import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const DetailsScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 20 }}>
        DetailsScreen
      </Text>
      <Button
        title="Profile"
        onPress={() =>
          navigation.navigate("Profile", { username: "John Wick" })
        }
      ></Button>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({});
