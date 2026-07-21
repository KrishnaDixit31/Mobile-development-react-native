import { Slot } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

const ProfileLayout = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Header</Text>
      <View style={styles.content}>
        <Slot />
      </View>
      <Text style={styles.footer}>Footer</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 12, textAlign: 'center' },
  content: { flex: 1 },
  footer: { padding: 12, textAlign: 'center' },
});

export default ProfileLayout;
