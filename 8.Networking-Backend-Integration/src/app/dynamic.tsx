import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TextInput,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Dynamic() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users/5");
      const data = await res.json();
      // console.log(data.users);
      setUsers(data.users || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };
  const updateUser = async ({ name, password }) => {
    try {
      const res = await fetch("/api/users/5", {
        // Points to dynamic id route /api/users/1
        method: "PATCH", // Using PATCH for partial updates
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });
      fetchUsers(); // Refresh user details after update
      setName("");
      setPassword("");
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Fill the new data here</Text>
      <TextInput
        placeholder="Enter your name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Enter your password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title="Update User"
        onPress={() => updateUser({ name, password })}
      />
      <Button title="Get user" onPress={() => fetchUsers()} />
      <Text>Users Name</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>Username - {item.name}</Text>}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        style={styles.userContainer}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 20,
    paddingTop: 20,
  },
  input: {
    minWidth: 300,
    backgroundColor: "#cbd5e1",
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  userContainer: {
    flex: 1,
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#7dd3fc",
    marginBottom: 20,
  },
  listContent: {
    padding: 20,
  },
  separator: {
    height: 10,
  },
});
