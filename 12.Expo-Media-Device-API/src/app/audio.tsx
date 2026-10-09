import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import { Ionicons } from "@expo/vector-icons";
import SaveToGallery from "@/components/SaveToGallery";

const SAMPLE_URL =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const Audio = () => {
  const player = useAudioPlayer(SAMPLE_URL, { downloadFirst: true });
  const status = useAudioPlayerStatus(player);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const loadedUri = useRef(SAMPLE_URL);
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const RecState = useAudioRecorderState(recorder);

  useEffect(() => {
    (async () => {
      const permission = await AudioModule.requestRecordingPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Microphone required", "Grant mic access to record audio.");
        return;
      }

      await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });
    })();
  }, []);

  const startRec = async () => {
    await recorder.prepareToRecordAsync();
    recorder.record();
  };
  const stopRec = async () => {
    await recorder.stop();
    if (recorder.uri) {
      setRecordingUri(recorder.uri);

      try {
        await SaveToGallery(recorder.uri);
        Alert.alert("Saved", "Recording saved to your gallery.");
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

  const playSource = (uri: string) => {
    if (status.playing && loadedUri.current === uri) {
      player.pause();
      return;
    }

    if (loadedUri.current !== uri) {
      player.replace(uri);
      loadedUri.current = uri;
    } else if (player.currentTime >= player.duration) {
      player.seekTo(0);
    }

    player.play();
  };

  const playAudio = () => playSource(SAMPLE_URL);

  const playRec = () => {
    if (!recordingUri) {
      Alert.alert("No recording", "Record something first.");
      return;
    }
    playSource(recordingUri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Music</Text>
      <View
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.playerContainer}>
          <Ionicons name="musical-note" size={82} color="#fff" />
        </View>

        <Text style={{ color: "#fff", marginTop: 16 }}>
          {formatTime(status.currentTime)} / {formatTime(status.duration)}
        </Text>
      </View>
      <View style={{ width: "100%", alignItems: "center" }}>
        <View style={styles.divider}></View>

        <View style={styles.controlContainer}>
          <Pressable onPress={playAudio}>
            <Ionicons
              name={status.playing ? "pause" : "play"}
              size={52}
              color="#fff"
            />
          </Pressable>

          <View style={styles.recordingControls}>
            <Text style={styles.recordingStatus}>
              {RecState.isRecording ? "Recording…" : "Ready"} ·{" "}
              {Math.round(RecState.durationMillis / 1000)}s
            </Text>

            <View style={styles.recordingAction}>
              <Pressable onPress={RecState.isRecording ? stopRec : startRec}>
                <Ionicons
                  name={
                    RecState.isRecording
                      ? "stop-circle-outline"
                      : "mic-circle-outline"
                  }
                  size={32}
                  color="#fff"
                />
              </Pressable>
              <Text style={styles.recordingLabel}>rec</Text>
            </View>
            <View style={styles.recordingAction}>
              <Pressable onPress={playRec} disabled={!recordingUri}>
                <Ionicons
                  name={status.playing ? "pause" : "play"}
                  size={32}
                  color="#fff"
                />
              </Pressable>
              <Text style={styles.recordingLabel}>play rec</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Audio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    padding: 24,
    alignItems: "center",
    backgroundColor: "#222",
  },
  text: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
  },
  playerContainer: {
    width: "100%",
    maxWidth: 280,
    height: 300,
    marginTop: -24,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#333",
    borderWidth: 1,
    borderColor: "#ffffff7d",
  },
  divider: {
    width: "90%",
    maxWidth: 280,
    height: 1,
    backgroundColor: "#ffffff82",
  },
  controlContainer: {
    width: "100%",
    maxWidth: 280,
    minHeight: 150,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 16,
    alignSelf: "center",
  },
  recordingControls: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  recordingStatus: {
    color: "#fff",
  },
  recordingAction: {
    alignItems: "center",
  },
  recordingLabel: {
    color: "#fff",
    fontSize: 10,
  },
});
