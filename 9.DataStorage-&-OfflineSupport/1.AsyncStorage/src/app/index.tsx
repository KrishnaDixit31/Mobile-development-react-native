import { Text, View, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@react-navigation/elements";

export default function Index() {
  const [output, setOutput] = useState("");

  const USER_1 = {
    name: "Tom",
    age: 20,
  };

  const SaveData = async () => {
    await AsyncStorage.setItem("name", "Krishna");
    setOutput("Data Saved Successfully 👍");
  };

  const GetData = async () => {
    const value = await AsyncStorage.getItem("name");
    setOutput(value || "No Data Present");
  };

  const RemoveData = async () => {
    await AsyncStorage.removeItem("name");
    setOutput("Data Removed successfully 👍");
  };

  const ClearStorage = async () => {
    await AsyncStorage.clear();
    setOutput("Storage Cleared successfully 👍");
  };

  const GetAllKeys = async () => {
    const allKeys = await AsyncStorage.getAllKeys();
    console.log(allKeys);
    setOutput(allKeys.length ? allKeys.join(", ") : "No Key Present");
  };

  const saveObject = async () => {
    await AsyncStorage.setItem("userObj", JSON.stringify(USER_1));
    setOutput("Object Saved Successfully 👍");
  };

  const GetObject = async () => {
    const value = await AsyncStorage.getItem("userObj");
    const parsed = value ? JSON.parse(value) : null;
    setOutput(parsed ? JSON.stringify(parsed) : "No Object Present");
  };

  const mergeValue = async () => {
    await AsyncStorage.mergeItem(
      "userObj",
      JSON.stringify({ role: "Developer" }),
    );
    const mergedData = await AsyncStorage.getItem("userObj");
    setOutput(mergedData || "No Data");
  };

  const saveMultiple = async () => {
    await AsyncStorage.multiSet([
      ["username", "John"],
      ["role", "Developer"],
    ]);
    setOutput("Multiple Data Saved Successfully 👍");
  };

  const getMultiple = async () => {
    const values = await AsyncStorage.multiGet(["username", "role"]);
    // console.log(values);
    setOutput(values.length ? JSON.stringify(values) : "No Data Present");
  };

  const removeMultiple = async () => {
    await AsyncStorage.multiRemove(["username", "role"]);
    setOutput("Multiple Data Removed 👍");
  };

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
          {/* Single Item */}
          <Button
            style={[styles.gridBtn, { backgroundColor: "#2563EB" }]}
            color="#fff"
            onPressIn={SaveData}
          >
            Save Data
          </Button>
          <Button
            style={[styles.gridBtn, { backgroundColor: "#16A34A" }]}
            color="#fff"
            onPressIn={GetData}
          >
            Get Data
          </Button>

          {/* Objects */}
          <Button
            style={[styles.gridBtn, { backgroundColor: "#0284C7" }]}
            color="#fff"
            onPressIn={saveObject}
          >
            Save Object
          </Button>
          <Button
            style={[styles.gridBtn, { backgroundColor: "#0D9488" }]}
            color="#fff"
            onPressIn={GetObject}
          >
            Get Object
          </Button>

          {/* Multiple Items */}
          <Button
            style={[styles.gridBtn, { backgroundColor: "#D97706" }]}
            color="#fff"
            onPressIn={saveMultiple}
          >
            Save Multi
          </Button>
          <Button
            style={[styles.gridBtn, { backgroundColor: "#7C3AED" }]}
            color="#fff"
            onPressIn={getMultiple}
          >
            Get Multi
          </Button>

          {/* Advanced / Keys */}
          <Button
            style={[styles.gridBtn, { backgroundColor: "#9333EA" }]}
            color="#fff"
            onPressIn={mergeValue}
          >
            Merge Value
          </Button>
          <Button
            style={[styles.gridBtn, { backgroundColor: "#4F46E5" }]}
            color="#fff"
            onPressIn={GetAllKeys}
          >
            Get All Keys
          </Button>

          {/* Delete actions */}
          <Button
            style={[styles.gridBtn, { backgroundColor: "#E11D48" }]}
            color="#fff"
            onPressIn={RemoveData}
          >
            Remove Data
          </Button>
          <Button
            style={[styles.gridBtn, { backgroundColor: "#BE123C" }]}
            color="#fff"
            onPressIn={removeMultiple}
          >
            Remove Multi
          </Button>

          {/* Clear Storage (Full width danger button) */}
          <Button
            style={[styles.fullBtn, { backgroundColor: "#DC2626" }]}
            color="#fff"
            onPressIn={ClearStorage}
          >
            Clear All Storage
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
    marginBottom: 8,
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
    marginBottom: 12,
    borderRadius: 12,
  },
  fullBtn: {
    width: "100%",
    marginTop: 4,
    marginBottom: 12,
    borderRadius: 12,
  },
});
