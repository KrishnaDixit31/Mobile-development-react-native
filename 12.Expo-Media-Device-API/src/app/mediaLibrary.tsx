import { Asset } from "expo-asset";
import { Image } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import { useState } from "react";
import { Alert, Button, Text, View } from "react-native";

const bundledImage = require("@/assets/images/icon.png");

export default function CreateAssetScreen() {
  const [createdAsset, setCreatedAsset] = useState<MediaLibrary.Asset | null>(
    null,
  );

  const saveAndGetAsset = async () => {
    const writePermission = await MediaLibrary.requestPermissionsAsync(true);
    if (!writePermission.granted) {
      Alert.alert(
        "Write permission required",
        "Allow saving to photo library.",
      );
      return;
    }

    const asset = Asset.fromModule(bundledImage);
    await asset.downloadAsync();

    if (!asset.localUri) {
      Alert.alert("Error", "Could not resolve local file.");
      return;
    }

    const newAsset = await MediaLibrary.createAssetAsync(asset.localUri);
    setCreatedAsset(newAsset);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24, gap: 12 }}>
      <Image
        source={bundledImage}
        style={{ width: 100, height: 100 }}
        contentFit="cover"
      />

      <Button title="Save and get asset" onPress={saveAndGetAsset} />

      {createdAsset && (
        <>
          <Text>Saved to gallery.</Text>
          <Text selectable>ID: {createdAsset.id}</Text>
          <Text selectable>URI: {createdAsset.uri}</Text>
          <Text>
            {createdAsset.width}×{createdAsset.height}
          </Text>
        </>
      )}
    </View>
  );
}
