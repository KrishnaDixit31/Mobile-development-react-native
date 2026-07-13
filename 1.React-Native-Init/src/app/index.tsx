import { useState } from "react";
import {
  Button,
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  initialWindowMetrics,
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

//* Example showing how to use Text, Image (local and remote), and basic View layouts:
function TextAndImageExample() {
  return (
    <View style={{ padding: 10, backgroundColor: "#38bdf8", flex: 1 }}>
      <View>
        <Text>Hello world</Text>
        <Text numberOfLines={3}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur
          facere corrupti quae corporis? Porro blanditiis voluptatem iste
          voluptate dolorem unde assumenda veritatis, doloribus quasi cupiditate
          voluptates, ratione expedita inventore ducimus?
        </Text>
      </View>

      <View style={{ marginTop: 10 }}>
        {/* Remote image from internet */}
        <Text>Remote image from internet</Text>
        <Image
          source={{
            uri: "https://media.geeksforgeeks.org/wp-content/uploads/20260109124745578888/balanced_scorecard.webp",
          }}
          style={{ width: 300, height: 150 }}
          resizeMode="contain"
        />

        {/* Local image  */}
        <Text>Local image</Text>
        <Image
          source={require("../../assets/images/icon.png")}
          style={{ width: 200, height: 200 }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

//* Example showing how to use TextInput, Button, and Switch components:
function TextInputExample() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <View
      style={{
        padding: 10,
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      <TextInput
        placeholder="Enter your name"
        placeholderTextColor={"#9ca3af"}
        value={name}
        onChangeText={setName}
        style={{
          width: 300,
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 8,
          marginTop: 10,
          paddingHorizontal: 15,
          paddingVertical: 10,
          fontSize: 16,
        }}
      />
      <TextInput
        placeholder="Enter your password"
        placeholderTextColor={"#9ca3af"}
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        style={{
          width: 300,
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 8,
          marginTop: 10,
          paddingHorizontal: 15,
          paddingVertical: 10,
          fontSize: 16,
        }}
      />
      <TextInput
        placeholder="Message us"
        placeholderTextColor={"#9ca3af"}
        multiline
        value={message}
        onChangeText={setMessage}
        style={{
          width: 300,
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 8,
          marginTop: 10,
          paddingHorizontal: 15,
          paddingVertical: 10,
          fontSize: 16,
        }}
      />

      <Pressable
        onPress={() =>
          alert(
            `Button is Pressed\nName: ${name}\nPassword: ${password}\nMessage: ${message}`,
          )
        }
        style={({ pressed }) => ({
          backgroundColor: pressed ? "#4a42d4" : "#6C63FF",
          width: 80,
          alignItems: "center",
          padding: 10,
          marginTop: 20,
          borderRadius: 10,
        })}
        hitSlop={{
          top: 10,
          bottom: 10,
          left: 20,
          right: 20,
        }}
      >
        <Text style={{ color: "#fff" }}>Button</Text>
      </Pressable>

      <Switch
        style={{ width: 60, marginTop: 15 }}
        value={isDarkMode}
        onValueChange={setIsDarkMode}
        trackColor={{ false: "#ddd", true: "#6c63ff" }}
        thumbColor={"#4a42d4"}
      />
    </View>
  );
}

//* Example showing how to use ScrollView to display multiple items with styling:
function ScrollViewExample() {
  const items = Array.from({ length: 20 }, (_, i) => `Items ${i + 1}`);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        padding: 16,
        alignItems: "center",
      }}
    >
      {items.map((item) => (
        <View
          key={item}
          style={{
            backgroundColor: "#fff",
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
            padding: 16,
            marginBottom: 10,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 16 }}>{item}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

//* Example showing how to use FlatList to render a list of items:
function FlatListExample() {
  const USERS = [
    { id: "1", name: "Alice Johnson", role: "Designer" },
    { id: "2", name: "Bob Smith", role: "Developer" },
    { id: "3", name: "Carol White", role: "Manager" },
    { id: "4", name: "David Brown", role: "Developer" },
    { id: "5", name: "Eve Davis", role: "Designer" },
  ];

  return (
    <FlatList
      data={USERS}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Text>{item.name}</Text>}
      horizontal={false}
      style={{ backgroundColor: "#bfdbfe" }}
      contentContainerStyle={{
        padding: 16,
        backgroundColor: "#60a5fa",
        gap: 20,
      }}
      ItemSeparatorComponent={() => (
        <View style={{ height: 1, backgroundColor: "#34d399" }}></View>
      )}
    />
  );
}

//* Example showing how to use KeyboardAvoidingView components:
function KeyboardAvoidingViewExample() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          padding: 10,
          backgroundColor: "#fff",
          justifyContent: "flex-end",
        }}
      >
        <TextInput
          placeholder="Enter your name"
          placeholderTextColor={"#9ca3af"}
          value={name}
          onChangeText={setName}
          style={{
            width: 300,
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 8,
            marginTop: 10,
            paddingHorizontal: 15,
            paddingVertical: 10,
            fontSize: 16,
          }}
        />
        <TextInput
          placeholder="Enter your password"
          placeholderTextColor={"#9ca3af"}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          style={{
            width: 300,
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 8,
            marginTop: 10,
            paddingHorizontal: 15,
            paddingVertical: 10,
            fontSize: 16,
          }}
        />
        <TextInput
          placeholder="Message us"
          placeholderTextColor={"#9ca3af"}
          multiline
          value={message}
          onChangeText={setMessage}
          style={{
            width: 300,
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 8,
            marginTop: 10,
            paddingHorizontal: 15,
            paddingVertical: 10,
            fontSize: 16,
          }}
        />

        <Pressable
          onPress={() =>
            alert(
              `Button is Pressed\nName: ${name}\nPassword: ${password}\nMessage: ${message}`,
            )
          }
          style={{
            backgroundColor: "#3b82f6",
            width: 80,
            alignItems: "center",
            padding: 10,
            marginTop: 20,
            borderRadius: 10,
          }}
          hitSlop={{
            top: 10,
            bottom: 10,
            left: 20,
            right: 20,
          }}
        >
          <Text style={{ color: "#fff" }}>Button</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

//* Example showing how to use ImageBackground components:
function ImageBackgroundExample() {
  return (
    <ImageBackground
      source={require("../../assets/images/logo-glow.png")}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#374151",
      }}
    >
      <Text style={{ fontSize: 30, color: "#fff" }}>Hello World</Text>
    </ImageBackground>
  );
}

//* Example showing how to use ImageBackground components:
function ButtonExample() {
  return (
    <View style={{ flex: 1, padding: 20, alignItems: "center" }}>
      <Button title="Press me" onPress={() => alert("Button is pressed")} />
      <TouchableOpacity
        style={{
          width: 80,
          height: 40,
          marginTop: 20,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#4ade80",
        }}
        onPress={() => alert("Tapped")}
        activeOpacity={0.7}
      >
        <Text>Tap Here</Text>
      </TouchableOpacity>
    </View>
  );
}

//* Example showing how to use SafeAreaView components:
function SafeAreaViewExample() {
  function UnsafeScreen() {
    return (
      <View style={{ flex: 1, backgroundColor: "#1c1c1e" }}>
        <Text style={{ color: "#fff", fontSize: 18, padding: 16 }}>
          Header (bleeds under notch!)
        </Text>
        <Text style={{ color: "#aaa", padding: 16 }}>
          This content might be hidden behind the status bar in dark mode.
        </Text>
      </View>
    );
  }

  function SafeScreen() {
    return (
      <SafeAreaView
        edges={["top", "bottom"]}
        style={{ flex: 1, backgroundColor: "#1c1c1e" }}
      >
        <Text style={{ color: "#fff", fontSize: 18, padding: 16 }}>
          Header (safely below notch ✅)
        </Text>
        <Text style={{ color: "#aaa", padding: 16 }}>
          This content respects the safe area on all devices.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    // <UnsafeScreen />
    <SafeScreen />
  );
}

//* Example showing how to use useSafeAreaInsets Hook:
function UseSafeAreaInsetExample() {
  const insets = useSafeAreaInsets();
  // insets.top    → e.g. 59 on iPhone 14 Pro
  // insets.bottom → e.g. 34 (home indicator area)
  // insets.left   → usually 0
  // insets.right  → usually 0

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#e5e5e5",
        paddingTop: insets.top, // Push below notch
        paddingBottom: insets.bottom, // Push above home indicator
      }}
    >
      <Text style={{ fontSize: 24, padding: 16 }}>Perfectly placed! 🎯</Text>
    </View>
  );
}

//* Example showing how to use initialWindowMetrics and  SafeAreaProvider components:
function InitialWindowMetrics() {
  console.log(initialWindowMetrics);
  // {
  //   insets: { top: 59, bottom: 34, left: 0, right: 0 },
  //   frame:  { x: 0, y: 0, width: 390, height: 844 }
  // }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={{ fontSize: 24, padding: 16 }}>Perfectly placed! 🎯</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default function HomeScreen() {
  return (
    // <TextAndImageExample />
    // <TextInputExample />
    // <ScrollViewExample />
    // <FlatListExample />
    // <KeyboardAvoidingViewExample />
    // <ImageBackgroundExample />
    // <ButtonExample />
    <SafeAreaViewExample />
    // <UseSafeAreaInsetExample />
    // <InitialWindowMetrics />
  );
}
