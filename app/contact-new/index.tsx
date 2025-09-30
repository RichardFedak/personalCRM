import { ThemedView } from "@/components/themed-view";
import * as schema from "@/db/schema";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { v4 as uuidv4 } from "uuid";

type LabeledInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
};

function LabeledInput({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
}: LabeledInputProps) {
  return (
    <ThemedView className="mb-5">
      <Text className="mb-2 text-sm font-semibold text-gray-600 dark:text-gray-300">
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        className="border border-gray-300 dark:border-gray-700 rounded-2xl p-4 text-base text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900"
        placeholderTextColor="#999"
      />
    </ThemedView>
  );
}

export default function NewContact() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  const router = useRouter();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Validation", "Please enter a name.");
      return;
    }

    const now = new Date().toISOString();

    try {
      await drizzleDb
        .insert(schema.contacts)
        .values({
          uuid: uuidv4(),
          name: name.trim(),
          address: address.trim(),
          phone: phoneNumber.trim(),
          created: now,
          lastEdited: now,
        })
        .run();

      router.back();
      Alert.alert("Success", "Contact created successfully!");
      setName("");
      setAddress("");
      setPhoneNumber("");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to create contact.");
    }
  };

  return (
    <SafeAreaView
      edges={["left", "right", "bottom"]}
      className="flex-1 bg-white dark:bg-black"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <ThemedView className="mb-4">
            <LabeledInput
              label="Name"
              value={name}
              onChangeText={setName}
            />
            <LabeledInput
              label="Address"
              value={address}
              onChangeText={setAddress}
            />
            <LabeledInput
              label="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />

            <TouchableOpacity
              onPress={handleSave}
              className="bg-blue-500 p-4 rounded-2xl items-center shadow-sm"
              activeOpacity={0.8}
            >
              <Text className="text-white font-bold text-lg">
                Save Contact
              </Text>
            </TouchableOpacity>
          </ThemedView>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
