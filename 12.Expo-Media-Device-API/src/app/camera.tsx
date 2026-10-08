import { StyleSheet, Text, View, Button, Pressable, Alert } from "react-native";
import {
  BarcodeScanningResult,
  CameraType,
  CameraView,
  FlashMode,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useIsFocused } from "expo-router";
import SaveToGallery from "@/components/SaveToGallery";

const Camera = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [ready, setReady] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const lastScanned = useRef<string | null>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const isFocused = useIsFocused();
  const [flash, setFlash] = useState<FlashMode>("off");
  const [torch, setTorch] = useState(false);
  const [facing, setFacing] = useState<CameraType>("back");
  const [zoom, setZoom] = useState(0);
  const [result, setResult] = useState<BarcodeScanningResult | null>(null);
  const [mode, setMode] = useState(false);
  const [micPermission, requestMicPermission] = useMicrophonePermissions();
  const [recording, setRecording] = useState(false);
  const [videoUri, setVideoUri] = useState<string | null>(null);

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading Permissions...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>We need camera access to take photos.</Text>
        <Button title="Grant camera access" onPress={requestPermission} />
      </View>
    );
  }

  const takePhoto = async () => {
    const photo = await cameraRef.current?.takePictureAsync({ quality: 0.8 });
    const capturedPhotoUri = photo?.uri ?? null;

    if (capturedPhotoUri) {
      setPhotoUri(capturedPhotoUri);

      try {
        await SaveToGallery(capturedPhotoUri);
      } catch (error) {
        if (
          error instanceof Error &&
          error.message !== "Photo library permission denied"
        ) {
          Alert.alert("Save failed", error.message);
        }
      }
    }
  };

  const startRecording = async () => {
    if (!micPermission?.granted) {
      const result = await requestMicPermission();
      if (!result.granted) return;
    }

    setRecording(true);
    const video = await cameraRef.current?.recordAsync({ maxDuration: 10 });
    const capturedVideoUri = video?.uri;

    if (!capturedVideoUri) {
      setRecording(false);
      return;
    }

    setVideoUri(capturedVideoUri);
    setRecording(false);

    try {
      await SaveToGallery(capturedVideoUri);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message !== "Video library permission denied"
      ) {
        Alert.alert("Save failed", error.message);
      }
    }
  };

  const stopRecording = () => {
    cameraRef.current?.stopRecording();
  };

  const cycleFlash = () => {
    setFlash((f) => (f === "off" ? "on" : f === "on" ? "auto" : "off"));
  };

  const onBarcodeScanned = (scan: BarcodeScanningResult) => {
    if (lastScanned.current === scan.data) return;
    lastScanned.current = scan.data;
    setResult(scan);
  };

  return (
    <View style={styles.cameraContainer}>
      {isFocused && (
        <CameraView
          ref={cameraRef}
          facing={facing}
          zoom={zoom}
          mirror={facing === "front"}
          mode={mode ? "video" : "picture"}
          flash={flash}
          enableTorch={torch}
          style={styles.camera}
          onCameraReady={() => setReady(true)}
          onMountError={({ message }) => console.warn(message)}
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          onBarcodeScanned={onBarcodeScanned}
        />
      )}
      <View style={styles.ModeContainer}>
        <Pressable onPress={() => setMode((m) => !m)}>
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#fff" }}>
            {mode ? "Video" : "Photo"}
          </Text>
        </Pressable>
      </View>
      <View style={styles.topIconContainer}>
        <Pressable
          onPress={cycleFlash}
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel="Toggle flash mode"
        >
          <Ionicons
            name={
              flash === "on"
                ? "flash"
                : flash === "auto"
                  ? "flash-outline"
                  : "flash-off-outline"
            }
            size={24}
            color={"#fff"}
          />
        </Pressable>
        <Pressable
          onPress={() => setTorch((t) => !t)}
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel="Toggle torch"
        >
          <Ionicons
            name={torch ? "flashlight" : "flashlight-outline"}
            size={24}
            color={"#fff"}
          />
        </Pressable>
      </View>
      <View style={styles.zoomContainer}>
        <Pressable
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel="Zoom in"
          onPress={() => {
            setZoom((z) => Math.min(1, z + 0.1));
          }}
        >
          <Ionicons name="add" size={24} color={"#fff"} />
        </Pressable>
        <Pressable
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel="Zoom out"
          onPress={() => {
            setZoom((z) => Math.max(0, z - 0.1));
          }}
        >
          <Ionicons name="remove" size={24} color={"#fff"} />
        </Pressable>
      </View>
      <View style={styles.bottomOverlay}>
        {result && (
          <View style={styles.resultBox}>
            <Text style={styles.resultLabel}>Scan result</Text>
            <Text style={styles.resultText} numberOfLines={3}>
              {`${result.type}: ${result.data}`}
            </Text>
          </View>
        )}
        {mode && videoUri && (
          <Text selectable style={styles.resultText}>
            {videoUri}
          </Text>
        )}

        <View style={styles.bottomContainer}>
          {photoUri ? (
            <Image
              source={{ uri: photoUri }}
              style={styles.img}
              contentFit="cover"
            />
          ) : (
            <View style={styles.imgPlaceholder} />
          )}

          {mode ? (
            <Pressable
              onPress={recording ? stopRecording : startRecording}
              disabled={!ready}
              style={[
                styles.captureButton,
                !ready && styles.captureButtonDisabled,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Record video"
            >
              <Ionicons
                name={recording ? "pause" : "play"}
                size={36}
                color={"#fff"}
              />
            </Pressable>
          ) : (
            <Pressable
              onPress={takePhoto}
              disabled={!ready}
              style={[
                styles.captureButton,
                !ready && styles.captureButtonDisabled,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Take photo"
            >
              <Ionicons name="camera-outline" size={36} color={"#fff"} />
            </Pressable>
          )}

          <Pressable
            onPress={() => setFacing((f) => (f === "back" ? "front" : "back"))}
            style={styles.flipCamera}
            accessibilityRole="button"
            accessibilityLabel="Flip camera"
          >
            <Ionicons name="camera-reverse" size={32} color={"#fff"} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
    padding: 16,
  },
  bottomOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 12,
  },
  bottomContainer: {
    minHeight: 80,
    backgroundColor: "#00000080",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 3,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  captureButtonDisabled: {
    opacity: 0.5,
  },
  img: {
    width: 52,
    height: 52,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ffffff99",
  },
  zoomContainer: {
    position: "absolute",
    left: 20,
    top: 80,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    backgroundColor: "#00000080",
    borderRadius: 22,
    padding: 4,
  },
  ModeContainer: {
    position: "absolute",
    top: 24,
    left: 20,
    backgroundColor: "#00000080",
    borderRadius: 24,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  topIconContainer: {
    position: "absolute",
    top: 12,
    right: 16,
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#00000080",
    borderRadius: 24,
    padding: 4,
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  flipCamera: {
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  imgPlaceholder: {
    width: 52,
    height: 52,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ffffff99",
    backgroundColor: "#ffffff22",
  },
  resultBox: {
    backgroundColor: "#000000b3",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#ffffff33",
    maxHeight: 116,
  },
  resultLabel: {
    color: "#ffffff99",
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 4,
  },
  resultText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "500",
  },
});
