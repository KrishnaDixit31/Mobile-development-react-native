import { Button } from "@react-navigation/elements";
import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";

export default function Index() {
  const [output, setOutput] = useState("");

  const user = {
    name: "Code Snippet",
    role: "Admin",
  };

  const SaveToken = async () => {
    await SecureStore.setItemAsync("token", "abcd123");
    setOutput("Token Saved 👍");
  };

  const GetToken = async () => {
    const value = await SecureStore.getItemAsync("token");
    setOutput(value || "No Token Found");
  };

  const DeleteToken = async () => {
    await SecureStore.deleteItemAsync("token");
    setOutput("Token Deleted 👍");
  };

  const checkAvailability = async () => {
    const isAvailable = await SecureStore.isAvailableAsync();
    setOutput(
      isAvailable ? "SecureStore Available 👍" : "SecureStore Not Available 👎",
    );
  };

  const SaveObject = async () => {
    await SecureStore.setItemAsync("userObject", JSON.stringify(user));
    setOutput("Object Saved 👍");
  };

  const GetObject = async () => {
    const value = await SecureStore.getItemAsync("userObject");
    const parsed = value ? JSON.parse(value) : null;
    setOutput(`${parsed.name} - ${parsed.role}` || "No Object Found");
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
            onPress={SaveToken}
          >
            Save Token
          </Button>
          <Button
            style={[styles.gridBtn, { backgroundColor: "#16A34A" }]}
            color="#fff"
            onPress={GetToken}
          >
            Get Token
          </Button>

          {/* Objects */}
          <Button
            style={[styles.gridBtn, { backgroundColor: "#0284C7" }]}
            color="#fff"
            onPress={SaveObject}
          >
            Save Object
          </Button>
          <Button
            style={[styles.gridBtn, { backgroundColor: "#0D9488" }]}
            color="#fff"
            onPress={GetObject}
          >
            Get Object
          </Button>

          {/* Delete actions */}
          <Button
            style={[styles.fullBtn, { backgroundColor: "#E11D48" }]}
            color="#fff"
            onPress={DeleteToken}
          >
            Remove Token
          </Button>

          {/* Clear Storage */}
          <Button
            style={[styles.fullBtn, { backgroundColor: "#7C5CE5" }]}
            color="#fff"
            onPress={checkAvailability}
          >
            Check Availability
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
    marginBottom: 24,
    borderRadius: 12,
  },
  fullBtn: {
    width: "100%",
    marginTop: 4,
    marginBottom: 24,
    borderRadius: 12,
  },
});
