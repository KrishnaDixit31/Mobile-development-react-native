import { Alert, Linking } from "react-native";
import * as MediaLibrary from "expo-media-library";

const SaveToGallery = async (uri: string) => {
  const { granted, canAskAgain } =
    await MediaLibrary.requestPermissionsAsync(true);

  if (!granted) {
    if (!canAskAgain) {
      Alert.alert(
        "Photo library access denied",
        "Enable photo library access in Settings to save photos.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() },
        ],
      );
    }
    throw new Error("Photo library permission denied");
  }

  const asset = await MediaLibrary.saveToLibraryAsync(uri);
  return asset;
};

export default SaveToGallery;
