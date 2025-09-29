import { ThemedView } from "@/components/themed-view";
import * as schema from "@/db/schema";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { v4 as uuidv4 } from "uuid";

export default function NewContact() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  const router = useRouter();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Validation", "Please enter a name.");
      return;
    }

    const now = new Date().toISOString();

    try {
      await drizzleDb.insert(schema.contacts).values({
        uuid: uuidv4(),
        name: name.trim(),
        address: address.trim(),
        created: now,
        lastEdited: now,
      }).run();
      router.back();
      Alert.alert("Success", "Contact created successfully!");
      setName("");
      setAddress("");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to create contact.");
    }
  };

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} className="flex-1 bg-white dark:bg-black">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <ThemedView className="mb-4">

            <TextInput
              placeholder="Name"
              value={name}
              onChangeText={setName}
              className="border border-gray-300 dark:border-gray-700 rounded-2xl p-4 mb-4 text-black dark:text-white"
              placeholderTextColor="#999"
            />

            <TextInput
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
              className="border border-gray-300 dark:border-gray-700 rounded-2xl p-4 mb-4 text-black dark:text-white"
              placeholderTextColor="#999"
            />

            <TouchableOpacity
              onPress={handleSave}
              className="bg-blue-500 p-4 rounded-2xl items-center shadow-sm"
              activeOpacity={0.8}
            >
              <Text className="text-white font-bold text-lg">Save Contact</Text>
            </TouchableOpacity>
          </ThemedView>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
