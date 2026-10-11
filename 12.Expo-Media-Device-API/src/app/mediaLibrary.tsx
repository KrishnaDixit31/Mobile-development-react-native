import {
  ActivityIndicator,
  Button,
  FlatList,
  Linking,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import { Image } from "expo-image";

const MediaLibraryScreen = () => {
  const [permission, requestPermission] = MediaLibrary.usePermissions();
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (permission?.granted) {
      loadGallery();
    }
  }, [permission?.granted]);

  if (!permission) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <Text style={styles.text}>Checking media library permission…</Text>
      </View>
    );
  }

  if (!permission.granted) {
    const deniedPermanently = !permission.canAskAgain;

    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionTitle}>Photo library access</Text>
        <Text style={styles.permissionText}>
          We need access to show your photos and videos inside the app.
        </Text>

        {deniedPermanently ? (
          <>
            <Text style={styles.permissionText}>
              Access was denied. Enable it in Settings.
            </Text>
            <Button
              title="Open Settings"
              onPress={() => Linking.openSettings()}
            />
          </>
        ) : (
          <Button title="Grant access" onPress={requestPermission} />
        )}
      </View>
    );
  }

  const loadGallery = async () => {
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) return;
    }

    setLoading(true);
    try {
      const page = await MediaLibrary.getAssetsAsync({
        first: 12,
        mediaType: MediaLibrary.MediaType.photo,
        sortBy: [[MediaLibrary.SortBy.creationTime, false]],
      });
      setAssets(page.assets);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Media Gallery</Text>
      <Text style={styles.subText}>
        {assets.length} Photos · Access: {permission.accessPrivileges}
      </Text>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          style={styles.flatList}
          data={assets}
          keyExtractor={(item) => item.id}
          numColumns={3}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.gridItem}>
              <Image
                source={{ uri: item.uri }}
                style={styles.image}
                contentFit="cover"
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default MediaLibraryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    padding: 24,
    alignItems: "center",
    backgroundColor: "#222",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#222",
  },
  permissionTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
  },
  permissionText: {
    color: "#ddd",
    fontSize: 16,
    marginBottom: 16,
  },
  text: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },
  subText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  flatList: {
    width: "100%",
    flex: 1,
    marginTop: 12,
  },
  listContent: {
    paddingBottom: 16,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 8,
  },
  gridItem: {
    width: "31%",
    aspectRatio: 1,
    overflow: "hidden",
    backgroundColor: "#333",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
