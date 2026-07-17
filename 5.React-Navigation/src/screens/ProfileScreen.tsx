import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = ({ route }) => {
  const { username } = route.params;
  const navigation = useNavigation();
  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 20 }}>
        ProfileScreen
      </Text>
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 20 }}>
        {username}
      </Text>

      <View style={{ gap: 20 }}>
        <Button title="Go Back" onPress={() => navigation.goBack()}></Button>

        {/* Always adds a new instance on top of stack (even if it’s the same screen). */}
        <Button
          title="Push to Profile"
          onPress={() => navigation.push("Profile", { username: "Cane" })}
        ></Button>

        {/* Go back to a specific screen in the stack */}
        <Button
          title="Pop To Home"
          onPress={() => navigation.popTo("Home")}
        ></Button>

        {/* Go back to the first screen in stack */}
        <Button
          title="Pop To Top"
          onPress={() => navigation.popToTop()}
        ></Button>

        {/* Replace current screen (user can’t go back to the previous one) */}
        <Button
          title="Replace screen"
          onPress={() => navigation.replace("Home")}
        ></Button>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
