import { Text, View, StyleSheet } from "react-native";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { Button } from "@react-navigation/elements";
import { SafeAreaView } from "react-native-safe-area-context";

const db = SQLite.openDatabaseSync("demo.db");

export default function Index() {
  const [output, setOutput] = useState("");

  // Create Table
  const createTable = () => {
    try {
      db.execSync(`
        CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT,
        age INTEGER
        );
        `);
      setOutput("Table Created 👍");
    } catch (error) {
      setOutput("Failed to Create Table");
    }
  };

  // Insert Data
  const insertUser = () => {
    try {
      db.runSync("INSERT INTO users (name, age) VALUES (?, ?)", "Cane", 22);
      setOutput("User Inserted 👍");
    } catch (error) {
      setOutput("Table is not Present, Create Table First");
    }
  };

  // Get First User
  const getFirstUser = () => {
    try {
      const first = db.getFirstSync("SELECT * FROM users");
      setOutput(JSON.stringify(first, null, 2));
    } catch (error) {
      setOutput("Table is not Present, Create Table First");
    }
  };

  // Get All Users
  const getallUsers = () => {
    try {
      const allUsers = db.getAllSync("SELECT * FROM users");
      setOutput(JSON.stringify(allUsers, null, 2));
    } catch (error) {
      setOutput("Table is not Present, Create Table First");
    }
  };

  // Update User
  const updateUser = () => {
    try {
      db.runSync("UPDATE users SET age = ? WHERE id = ?", 25, 1);
      setOutput("User Updated 👍");
    } catch (error) {
      setOutput("Table is not Present, Create Table First");
    }
  };

  // Delete User
  const deleteUser = () => {
    try {
      db.runSync("DELETE FROM users WHERE id=?", 1);
      setOutput("User Deleted 👍");
    } catch (error) {
      setOutput("Table is not Present, Create Table First");
    }
  };

  // Drop Table
  const dropTable = () => {
    try {
      db.execSync("DROP TABLE IF EXISTS users;");
      setOutput("Table Dropped 👍");
    } catch (error) {
      setOutput("Failed to Drop Table");
    }
  };

  // Prepare Statement
  const prepareStatement = () => {
    try {
      const statement = db.prepareSync(
        "INSERT INTO users (name, age) VALUES (?, ?)",
      );

      statement.executeSync(["Prepared User", 30]);
      statement.finalizeSync(); // finalizeSync() closes a prepared SQL statement to release its allocated memory and database resources.

      setOutput("Prepared Statement Executed 👍");
    } catch (error) {
      setOutput("Table is not Present, Create Table First");
    }
  };

  useEffect(() => {
    createTable();
  }, []);

  return (
    <SafeAreaView edges={["bottom"]} style={styles.safeArea}>
      {/* 1. FIXED TOP OUTPUT BOX */}
      <View style={styles.outputArea}>
        <View style={styles.outputHeader}>
          <Text style={styles.outputTitle}>LIVE OUTPUT</Text>
          {output ? (
            <Text style={styles.clearOutputText} onPress={() => setOutput("")}>
              Clear
            </Text>
          ) : null}
        </View>
        <Text style={styles.outputText}>
          {output ? output : "Tap any button below to see results"}
        </Text>
      </View>

      {/* 2. BUTTONS IN 2-COLUMN GRID */}
      <View style={styles.container}>
        <View style={styles.grid}>
          <Button
            style={[styles.gridBtn, { backgroundColor: "#2563EB" }]}
            color="#fff"
            onPress={createTable}
          >
            Create Table
          </Button>
          <Button
            style={[styles.gridBtn, { backgroundColor: "#16A34A" }]}
            color="#fff"
            onPress={insertUser}
          >
            Insert User
          </Button>

          <Button
            style={[styles.gridBtn, { backgroundColor: "#0284C7" }]}
            color="#fff"
            onPress={getFirstUser}
          >
            Get First User
          </Button>
          <Button
            style={[styles.gridBtn, { backgroundColor: "#0D9488" }]}
            color="#fff"
            onPress={getallUsers}
          >
            Get All Users
          </Button>
          <Button
            style={[styles.gridBtn, { backgroundColor: "#F59E0B" }]}
            color="#fff"
            onPress={updateUser}
          >
            Update User id=1
          </Button>

          <Button
            style={[styles.gridBtn, { backgroundColor: "#E11D48" }]}
            color="#fff"
            onPress={deleteUser}
          >
            Delete User
          </Button>

          <Button
            style={[styles.fullBtn, { backgroundColor: "#7C5CE5" }]}
            color="#fff"
            onPress={prepareStatement}
          >
            Prepare Statement
          </Button>
          <Button
            style={[styles.fullBtn, { backgroundColor: "#9333EA" }]}
            color="#fff"
            onPress={dropTable}
          >
            Drop Table
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  outputArea: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 12,
    padding: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#BFDBFE",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    minHeight: 250,
  },
  outputHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  outputTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
    letterSpacing: 0.5,
  },
  clearOutputText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#EF4444",
  },
  outputText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridBtn: {
    width: "48%",
    marginBottom: 16,
    borderRadius: 12,
  },
  fullBtn: {
    width: "100%",
    marginTop: 4,
    marginBottom: 16,
    borderRadius: 12,
  },
});
