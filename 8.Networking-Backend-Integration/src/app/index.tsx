import { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await fetch(
          "https://api.freeapi.app/api/v1/public/quotes?page=1&limit=10&query=human",
        );
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
