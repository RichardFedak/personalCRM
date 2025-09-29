import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { Alert, Text, TouchableOpacity, View } from "react-native";

export type Contact = {
  id: number;
  name: string;
  address: string | null;
  created: string;
  lastEdited: string;
};

type ContactItemProps = {
  contact: Contact;
  onDelete: (id: number) => void;
};

export function ContactItem({ contact, onDelete }: ContactItemProps) {
  const router = useRouter();

  const handleDelete = () => {
    Alert.alert(
      "Delete Contact",
      `Are you sure you want to delete "${contact.name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => onDelete(contact.id) },
      ]
    );
  };

  return (
    <Link
      href={{
        pathname: "/contact-detail/[userId]",
        params: { userId: String(contact.id) }
      }}
      className="mb-4 rounded-2xl bg-gray-100 dark:bg-gray-800 p-4 shadow-sm"
    >
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg px-2 font-semibold text-gray-900 dark:text-white flex-1">
          {contact.name}
        </Text>
        <TouchableOpacity onPress={handleDelete} className="ml-2">
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>

      {contact.address ? (
        <View className="mb-2 px-2 w-full">
          <Text className="text-gray-600 dark:text-gray-300">
            {contact.address}
          </Text>
        </View>
      ) : null}

      <View className="w-full">
        <Text className="text-xs text-gray-500 dark:text-gray-400">
          Created: {contact.created}
        </Text>
        <Text className="text-xs text-gray-500 dark:text-gray-400">
          Last Edited: {contact.lastEdited}
        </Text>
      </View>
    </Link>
  );
}
