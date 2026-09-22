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

export default function Index() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      // console.log(data.users);
      setUsers(data.users || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };
  const createUsers = async ({ name, password }) => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });
      fetchUsers(); // Refresh users after creation
      setName("");
      setPassword("");
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  const deleteUser = async (id: string | number) => {
    try {
      await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
      fetchUsers(); // Refresh users after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
        title="Post user"
        onPress={() => createUsers({ name, password })}
      />
      <Button title="Get user" onPress={() => fetchUsers()} />
      <Button
        title="Delete first user"
        onPress={() => users[0]?.id && deleteUser(users[0].id)}
      />

      <Text>Users List</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userRow}>
            <Text>{item.id}.</Text>
            <Text>Username - {item.name}</Text>
            <Button
              title="Delete"
              color="#ef4444"
              onPress={() => deleteUser(item.id)}
            />
          </View>
        )}
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
  userRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  separator: {
    height: 10,
  },
});
