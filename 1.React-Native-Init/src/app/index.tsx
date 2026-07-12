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

export default function HomeScreen() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const items = Array.from({ length: 20 }, (_, i) => `Items ${i + 1}`);
  const USERS = [
    { id: "1", name: "Alice Johnson", role: "Designer" },
    { id: "2", name: "Bob Smith", role: "Developer" },
    { id: "3", name: "Carol White", role: "Manager" },
    { id: "4", name: "David Brown", role: "Developer" },
    { id: "5", name: "Eve Davis", role: "Designer" },
  ];

  return (
    //* Example showing how to use Text, Image (local and remote), and basic View layouts:
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

    //* Example showing how to use TextInput, Button, and Switch components:
    // <View
    //   style={{
    //     padding: 10,
    //     backgroundColor: "#fff",
    //     flex: 1,
    //   }}
    // >
    //   <TextInput
    //     placeholder="Enter your name"
    //     placeholderTextColor={"#9ca3af"}
    //     value={name}
    //     onChangeText={setName}
    //     style={{
    //       width: 300,
    //       borderWidth: 1,
    //       borderColor: "#ddd",
    //       borderRadius: 8,
    //       marginTop: 10,
    //       paddingHorizontal: 15,
    //       paddingVertical: 10,
    //       fontSize: 16,
    //     }}
    //   />
    //   <TextInput
    //     placeholder="Enter your password"
    //     placeholderTextColor={"#9ca3af"}
    //     secureTextEntry={true}
    //     value={password}
    //     onChangeText={setPassword}
    //     style={{
    //       width: 300,
    //       borderWidth: 1,
    //       borderColor: "#ddd",
    //       borderRadius: 8,
    //       marginTop: 10,
    //       paddingHorizontal: 15,
    //       paddingVertical: 10,
    //       fontSize: 16,
    //     }}
    //   />
    //   <TextInput
    //     placeholder="Message us"
    //     placeholderTextColor={"#9ca3af"}
    //     multiline
    //     value={message}
    //     onChangeText={setMessage}
    //     style={{
    //       width: 300,
    //       borderWidth: 1,
    //       borderColor: "#ddd",
    //       borderRadius: 8,
    //       marginTop: 10,
    //       paddingHorizontal: 15,
    //       paddingVertical: 10,
    //       fontSize: 16,
    //     }}
    //   />

    //   <Pressable
    //     onPress={() =>
    //       alert(
    //         `Button is Pressed\nName: ${name}\nPassword: ${password}\nMessage: ${message}`,
    //       )
    //     }
    //     style={({ pressed }) => ({
    //       backgroundColor: pressed ? "#4a42d4" : "#6C63FF",
    //       width: 80,
    //       alignItems: "center",
    //       padding: 10,
    //       marginTop: 20,
    //       borderRadius: 10,
    //     })}
    //     hitSlop={{
    //       top: 10,
    //       bottom: 10,
    //       left: 20,
    //       right: 20,
    //     }}
    //   >
    //     <Text style={{ color: "#fff" }}>Button</Text>
    //   </Pressable>

    //   <Switch
    //     style={{ width: 60, marginTop: 15 }}
    //     value={isDarkMode}
    //     onValueChange={setIsDarkMode}
    //     trackColor={{ false: "#ddd", true: "#6c63ff" }}
    //     thumbColor={"#4a42d4"}
    //   />
    // </View>

    //* Example showing how to use ScrollView to display multiple items with styling:
    // <ScrollView
    //   style={{ flex: 1 }}
    //   contentContainerStyle={{
    //     padding: 16,
    //     alignItems: "center",
    //   }}
    // >
    //   {items.map((item) => (
    //     <View
    //       key={item}
    //       style={{
    //         backgroundColor: "#fff",
    //         shadowColor: "#000",
    //         shadowOpacity: 0.05,
    //         shadowRadius: 4,
    //         elevation: 2,
    //         padding: 16,
    //         marginBottom: 10,
    //         borderRadius: 10,
    //       }}
    //     >
    //       <Text style={{ fontSize: 16 }}>{item}</Text>
    //     </View>
    //   ))}
    // </ScrollView>

    //* Example showing how to use FlatList to render a list of items:
    // <FlatList
    //   data={USERS}
    //   keyExtractor={(item) => item.id}
    //   renderItem={({ item }) => <Text>{item.name}</Text>}
    //   horizontal={false}
    //   style={{ backgroundColor: "#bfdbfe" }}
    //   contentContainerStyle={{
    //     padding: 16,
    //     backgroundColor: "#60a5fa",
    //     gap: 20,
    //   }}
    //   ItemSeparatorComponent={() => (
    //     <View style={{ height: 1, backgroundColor: "#34d399" }}></View>
    //   )}
    // />

    //* Example showing how to use KeyboardAvoidingView components:
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    //   style={{ flex: 1 }}
    // >
    //   <View
    //     style={{
    //       flex: 1,
    //       padding: 10,
    //       backgroundColor: "#fff",
    //       justifyContent: "flex-end",
    //     }}
    //   >
    //     <TextInput
    //       placeholder="Enter your name"
    //       placeholderTextColor={"#9ca3af"}
    //       value={name}
    //       onChangeText={setName}
    //       style={{
    //         width: 300,
    //         borderWidth: 1,
    //         borderColor: "#ddd",
    //         borderRadius: 8,
    //         marginTop: 10,
    //         paddingHorizontal: 15,
    //         paddingVertical: 10,
    //         fontSize: 16,
    //       }}
    //     />
    //     <TextInput
    //       placeholder="Enter your password"
    //       placeholderTextColor={"#9ca3af"}
    //       secureTextEntry={true}
    //       value={password}
    //       onChangeText={setPassword}
    //       style={{
    //         width: 300,
    //         borderWidth: 1,
    //         borderColor: "#ddd",
    //         borderRadius: 8,
    //         marginTop: 10,
    //         paddingHorizontal: 15,
    //         paddingVertical: 10,
    //         fontSize: 16,
    //       }}
    //     />
    //     <TextInput
    //       placeholder="Message us"
    //       placeholderTextColor={"#9ca3af"}
    //       multiline
    //       value={message}
    //       onChangeText={setMessage}
    //       style={{
    //         width: 300,
    //         borderWidth: 1,
    //         borderColor: "#ddd",
    //         borderRadius: 8,
    //         marginTop: 10,
    //         paddingHorizontal: 15,
    //         paddingVertical: 10,
    //         fontSize: 16,
    //       }}
    //     />

    //     <Pressable
    //       onPress={() =>
    //         alert(
    //           `Button is Pressed\nName: ${name}\nPassword: ${password}\nMessage: ${message}`,
    //         )
    //       }
    //       style={{
    //         backgroundColor: "#3b82f6",
    //         width: 80,
    //         alignItems: "center",
    //         padding: 10,
    //         marginTop: 20,
    //         borderRadius: 10,
    //       }}
    //       hitSlop={{
    //         top: 10,
    //         bottom: 10,
    //         left: 20,
    //         right: 20,
    //       }}
    //     >
    //       <Text style={{ color: "#fff" }}>Button</Text>
    //     </Pressable>
    //   </View>
    // </KeyboardAvoidingView>

    //* Example showing how to use ImageBackground components:
    // <ImageBackground
    //   source={require("../../assets/images/logo-glow.png")}
    //   style={{
    //     flex: 1,
    //     alignItems: "center",
    //     justifyContent: "center",
    //     backgroundColor: "#374151",
    //   }}
    // >
    //   <Text style={{ fontSize: 30, color: "#fff" }}>Hello World</Text>
    // </ImageBackground>

    //* Example showing how to use ImageBackground components:
    // <View style={{ flex: 1, padding: 20, alignItems: "center" }}>
    //   <Button title="Press me" onPress={() => alert("Button is pressed")} />
    //   <TouchableOpacity
    //     style={{
    //       width: 80,
    //       height: 60,
    //       marginTop: 20,
    //       alignItems: "center",
    //       justifyContent: "center",
    //       backgroundColor: "red",
    //     }}
    //     onPress={() => alert("Tapped")}
    //     activeOpacity={0.7}
    //   >
    //     <Text>Tap Here</Text>
    //   </TouchableOpacity>
    // </View>
  );
}
