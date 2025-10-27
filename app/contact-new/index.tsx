import LabeledInput from "@/components/labeled-input";
import { ThemedView } from "@/components/themed-view";
import * as schema from "@/db/schema";
import { useTranslation } from "@/hooks/useTranslation";
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
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { v4 as uuidv4 } from "uuid";

export default function NewContact() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  const router = useRouter();
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert(t.validation.required, t.validation.nameRequired);
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
      Alert.alert(t.common.success, t.contacts.newContactCreatedMessage);
      setName("");
      setAddress("");
      setPhoneNumber("");
    } catch (error) {
      console.error(error);
      Alert.alert(t.common.error, t.common.error);
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
              label={t.contactForm.firstName}
              value={name}
              onChangeText={setName}
              placeholder={t.contactForm.firstNamePlaceholder}
            />
            <LabeledInput
              label={t.contactForm.lastName}
              value={address}
              onChangeText={setAddress}
              placeholder={t.contactForm.lastNamePlaceholder}
            />
            <LabeledInput
              label={t.contactForm.phone}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              placeholder={t.contactForm.phonePlaceholder}
            />

            <TouchableOpacity
              onPress={handleSave}
              className="bg-blue-500 p-4 rounded-2xl items-center shadow-sm"
              activeOpacity={0.8}
            >
              <Text className="text-white font-bold text-lg">
                {t.common.save}
              </Text>
            </TouchableOpacity>
          </ThemedView>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
