import { Text, View, StyleSheet, ScrollView } from "react-native";
import { File, Directory, Paths } from "expo-file-system";
import { useState } from "react";
import { Button } from "@react-navigation/elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

export default function Index() {
  const [output, setOutput] = useState("");
  const [downloadImageUri, setDownloadImageUri] = useState("");

  // we have two Directories:- 1.Paths.document (permanent), 2.Paths.cache (temporary)
  const demoFile = new File(Paths.cache, "example.txt");
  const copyHere = new File(Paths.cache, "copy.txt");
  const moveHere = new File(Paths.cache, "move.txt");

  // Write File
  const writeFile = () => {
    demoFile.write("Hello expo filesystem");
    setOutput("File written successfully 👍");
  };

  // Read File
  const readFile = async () => {
    const data = await demoFile.text();
    setOutput(data || "File is Empty");
  };

  // Append File
  const appendFile = async () => {
    const oldData = await demoFile.text();
    demoFile.write(oldData + " New Data Added");
    const newData = await demoFile.text();

    setOutput(`New Data Added :-\n${newData}` || "File is Empty");
  };

  // Copy File
  const copyFile = async () => {
    // File.copy does not overwrite an existing destination file.
    if (copyHere.exists) {
      copyHere.delete();
    }
    demoFile.copy(copyHere);
    const data = await copyHere.text();
    // console.log(data);
    setOutput(`copied File :-\n${JSON.stringify(data)}`);
  };

  // Move File
  // Moving copyHere file to moveHere file overwrites moveHere file with the content of copyHere file, and original copyHere file is deleted.
  const moveFile = async () => {
    if (!copyHere.exists) {
      setOutput(
        "Unable to move file: copy.txt does not exist. Copy the file first.",
      );
      return;
    }

    try {
      if (moveHere.exists) {
        moveHere.delete();
      }
      copyHere.move(moveHere);
      const data = await moveHere.text();
      setOutput(`Moved File :-\n${JSON.stringify(data)}`);
    } catch (error) {
      console.error("Unable to move file:", error);
      setOutput("Unable to move file.");
    }
  };

  // Delete File
  const deleteFile = () => {
    if (demoFile.exists) {
      demoFile.delete();
      setOutput("Files Deleted successfully 👍");
    } else {
      setOutput("No File is Present");
    }
  };

  // Get File Info
  const getFileInfo = () => {
    const info = {
      demoExist: demoFile.exists,
      copyExist: copyHere.exists,
      moveExist: moveHere.exists,
      demoName: demoFile.name,
      demoSize: demoFile.size,
      demoUri: demoFile.uri,
    };
    setOutput(JSON.stringify(info, null, 2));
  };

  // Create Directory
  const notesDirectory = new Directory(Paths.document, "Notes");
  // console.log(notesDirectory);

  // Create Folder inside Directory
  const createFolder = () => {
    const newFolder = new Directory(notesDirectory, "NewFolderName");
    if (!newFolder.exists) {
      newFolder.create({ intermediates: true }); // intermediates: true ka matlab hai agar Notes parent directory missing hai, to usse bhi create kar do.
      setOutput("Folder created Successfully 👍");
    } else {
      setOutput("Folder already exists 📁");
    }
  };

  // Read Directory
  const readDir = () => {
    const files = notesDirectory.list();
    setOutput(
      JSON.stringify(
        files.map((c) => c.uri),
        null,
        2,
      ),
    );
  };

  // Download file
  const downloadFile = async () => {
    const url = "https://picsum.photos/300";
    const folder = new Directory(Paths.cache, "images");

    try {
      // Folder sirf tab create karo jab already exist na karta ho
      if (!folder.exists) {
        folder.create();
      }

      const downloadImage = await File.downloadFileAsync(
        url,
        new File(folder, `image-${Date.now()}.jpg`),
      );

      setDownloadImageUri(downloadImage.uri);

      setOutput(
        JSON.stringify(
          {
            uri: downloadImage.uri,
            exists: downloadImage.exists,
            size: downloadImage.size,
          },
          null,
          2,
        ),
      );
    } catch (error) {
      console.error("Download error:", error);
      setOutput("Download failed ❌");
    }
  };

  // Pick files
  const pickFile = async () => {
    try {
      const file = await File.pickFileAsync();
      // console.log(file.textSync());
      setOutput(`✅ File picked successfully!\n\n📄 ${file.name}`);
    } catch {
      setOutput("No File Picked");
    }
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

      {/* 2. SCROLLABLE BUTTONS & IMAGE PREVIEW */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          <Button
            style={[styles.gridBtn, { backgroundColor: "#2563EB" }]}
            color="#fff"
            onPress={writeFile}
          >
            Write File
          </Button>
          <Button
            style={[styles.gridBtn, { backgroundColor: "#16A34A" }]}
            color="#fff"
            onPress={readFile}
          >
            Read File
          </Button>

          <Button
            style={[styles.gridBtn, { backgroundColor: "#0284C7" }]}
            color="#fff"
            onPress={appendFile}
          >
            Append File
          </Button>
          <Button
            style={[styles.gridBtn, { backgroundColor: "#0D9488" }]}
            color="#fff"
            onPress={copyFile}
          >
            Copy File
          </Button>
          <Button
            style={[styles.gridBtn, { backgroundColor: "#F59E0B" }]}
            color="#fff"
            onPress={moveFile}
          >
            Move File
          </Button>

          <Button
            style={[styles.gridBtn, { backgroundColor: "#E11D48" }]}
            color="#fff"
            onPress={deleteFile}
          >
            Delete Files
          </Button>

          <Button
            style={[styles.gridBtn, { backgroundColor: "#7C5CE5" }]}
            color="#fff"
            onPress={getFileInfo}
          >
            Get File Info
          </Button>
          <Button
            style={[styles.gridBtn, { backgroundColor: "#9333EA" }]}
            color="#fff"
            onPress={createFolder}
          >
            Create Folder
          </Button>
          <Button
            style={[styles.gridBtn, { backgroundColor: "#4F46E5" }]}
            color="#fff"
            onPress={readDir}
          >
            Read Directory
          </Button>
          <Button
            style={[styles.gridBtn, { backgroundColor: "#0891B2" }]}
            color="#fff"
            onPress={downloadFile}
          >
            Download Image
          </Button>
          <Button
            style={[styles.fullBtn, { backgroundColor: "#AC08B2" }]}
            color="#fff"
            onPress={pickFile}
          >
            Pick File
          </Button>
        </View>

        {/* 3. DOWNLOADED IMAGE PREVIEW CARD */}
        <View style={styles.imageCard}>
          <Text style={styles.downloadText}>🖼️ Downloaded Image Preview</Text>
          {downloadImageUri ? (
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: downloadImageUri }}
                style={styles.imageStyle}
                contentFit="cover"
                transition={300}
              />
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No image downloaded yet. Tap "Download Image" above to see it
                here!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
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
    marginTop: 10,
    marginBottom: 8,
    padding: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#BFDBFE",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  outputHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  outputTitle: {
    fontSize: 11,
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
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 36,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridBtn: {
    width: "48%",
    marginBottom: 10,
    borderRadius: 10,
  },
  fullBtn: {
    width: "100%",
    marginBottom: 12,
    borderRadius: 10,
  },
  imageCard: {
    marginTop: 4,
    padding: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
  },
  downloadText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E3A8A",
    marginBottom: 10,
  },
  imageWrapper: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  imageStyle: {
    width: 170,
    height: 170,
  },
  emptyContainer: {
    width: "100%",
    paddingVertical: 18,
    paddingHorizontal: 12,
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
  },
});
