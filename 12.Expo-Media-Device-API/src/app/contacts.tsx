import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Contacts from "expo-contacts";
import { useEffect, useState } from "react";

function formatName(contact: Contacts.Contact) {
  const parts = [contact.firstName, contact.lastName].filter(Boolean);
  return parts.length > 0
    ? parts.join(" ")
    : (contact.name ?? "Unnamed contact");
}

const contactsScreen = () => {
  const [permission, setPermission] =
    useState<Contacts.ContactsPermissionResponse | null>(null);
  const [hasContacts, setHasContacts] = useState<boolean | null>(null);
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [selectedContact, setSelectedContact] =
    useState<Contacts.Contact | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    Contacts.getPermissionsAsync().then(setPermission);
  }, []);

  const requestPermission = async () => {
    const result = await Contacts.requestPermissionsAsync();
    setPermission(result);

    if (!result.granted && !result.canAskAgain) {
      Alert.alert("Contacts denied", "Enable contacts access in Settings.", [
        { text: "Cancel", style: "cancel" },
        { text: "Open Settings", onPress: () => Linking.openSettings() },
      ]);
    }

    return result.granted;
  };

  const loadContacts = async () => {
    const granted = permission?.granted || (await requestPermission());
    if (!granted) {
      setStatus("Permission denied");
      return;
    }
    setLoading(true);
    try {
      const exist = await Contacts.hasContactsAsync();
      setHasContacts(exist);

      const { data } = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.PhoneNumbers,
          Contacts.Fields.Emails,
          Contacts.Fields.Company,
        ],
        pageSize: 20,
        sort: Contacts.SortTypes.FirstName,
      });

      setContacts(data);
      setStatus(`Loaded ${data.length} contacts`);
    } catch (error) {
      Alert.alert(
        "Load failed",
        error instanceof Error ? error.message : "Unknown error",
      );
    } finally {
      setLoading(false);
    }
  };

  const inspectContact = async (contact: Contacts.Contact) => {
    const contactId = (contact as Contacts.Contact & { id?: string }).id;
    if (!contactId) {
      setSelectedContact(contact);
      return;
    }

    try {
      const detailed = await Contacts.getContactByIdAsync(contactId, [
        Contacts.Fields.Emails,
        Contacts.Fields.PhoneNumbers,
        Contacts.Fields.Company,
      ]);
      setSelectedContact(detailed ?? contact);
      setStatus(`Selected ${formatName(detailed ?? contact)}.`);
    } catch {
      setSelectedContact(contact);
    }
  };

  const openNativePicker = async () => {
    try {
      const contact = await Contacts.presentContactPickerAsync();
      if (!contact) {
        setStatus("Native picker canceled.");
        return;
      }

      setSelectedContact(contact);
      setStatus(`Picked ${formatName(contact)} from native UI.`);
    } catch (error) {
      Alert.alert(
        "Picker failed",
        error instanceof Error ? error.message : "Unknown error",
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Contacts</Text>
      <Text style={styles.subText}>
        Permission: {permission?.granted ? "Granted" : "Not granted"}
      </Text>
      {!permission?.granted && (
        <Button title="Grant contacts access" onPress={requestPermission} />
      )}

      <Button title="Load contacts" onPress={loadContacts} />
      <Button title="Open native contact picker" onPress={openNativePicker} />

      {hasContacts === false && (
        <Text style={styles.subText}>No contacts on this device.</Text>
      )}
      {loading && <ActivityIndicator />}
      {status && <Text style={styles.subText}>{status}</Text>}

      {selectedContact && (
        <View style={{ gap: 4 }}>
          <Text style={styles.subText}>Selected contact</Text>
          <Text style={styles.subText}>{formatName(selectedContact)}</Text>
          <Text style={styles.subText}>
            {selectedContact.company ?? "No company"}
          </Text>
          <Text style={styles.subText}>
            Phone: {selectedContact.phoneNumbers?.[0]?.number ?? "None"}
          </Text>
          <Text style={styles.subText}>
            Email: {selectedContact.emails?.[0]?.email ?? "None"}
          </Text>
        </View>
      )}

      <FlatList
        data={contacts}
        keyExtractor={(item, index) =>
          (item as Contacts.Contact & { id?: string }).id ??
          `${item.name}-${index}`
        }
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => inspectContact(item)}
            style={{ paddingVertical: 10 }}
          >
            <Text style={styles.subText}>{formatName(item)}</Text>
            <Text style={styles.subText}>
              {item.phoneNumbers?.[0]?.number ?? "No phone"}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default contactsScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    gap: 24,
    padding: 24,
    backgroundColor: "#222",
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
});
