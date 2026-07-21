import { Tabs } from "expo-router";
import { Pressable, Text, View } from "react-native";

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingBottom: 50,
        justifyContent: "space-between",
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        return (
          <Pressable
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={{ opacity: isFocused ? 1 : 0.5, padding: 12 }}
          >
            <Text>{options.title}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function JsTabsLayout() {
  return (
    <Tabs tabBar={(prop) => <MyTabBar {...prop} />}>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      <Tabs.Screen name="setting" options={{ title: "Setting" }} />
    </Tabs>
  );
}
