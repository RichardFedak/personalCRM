import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useTranslation } from "@/hooks/useTranslation";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Alert, TouchableOpacity } from "react-native";

export type Contact = {
  id: number;
  name: string;
  address: string | null;
  phone: string | null;
  created: string;
  lastEdited: string;
};

type ContactItemProps = {
  contact: Contact;
  onDelete: (id: number) => void;
};

export function ContactItem({ contact, onDelete }: ContactItemProps) {
  const { colorScheme } = useTheme();
  const { t } = useTranslation();
  const colors = Colors[colorScheme];

  const handleDelete = () => {
    Alert.alert(
      t.common.delete,
      `Are you sure you want to delete "${contact.name}"?`,
      [
        { text: t.common.cancel, style: "cancel" },
        { text: t.common.delete, style: "destructive", onPress: () => onDelete(contact.id) },
      ]
    );
  };

  return (
    <Link
      href={{
        pathname: "/contact-detail/[userId]",
        params: { userId: String(contact.id) }
      }}
      asChild
    >
      <TouchableOpacity>
        <ThemedView 
          lightColor={colors.cardBackground} 
          darkColor={colors.cardBackground}
          className="mb-4 rounded-2xl p-4 shadow-sm"
        >
          <ThemedView className="flex-row justify-between items-center mb-2" lightColor="transparent" darkColor="transparent">
            <ThemedText 
              type="defaultSemiBold" 
              className="text-lg px-2 flex-1"
            >
              {contact.name}
            </ThemedText>
            <TouchableOpacity 
              onPress={(e) => {
                e.stopPropagation();
                handleDelete();
              }} 
              className="ml-2"
            >
              <Ionicons name="trash" size={24} color={colors.destructive} />
            </TouchableOpacity>
          </ThemedView>

          {contact.address ? (
            <ThemedView className="mb-2 px-2 w-full" lightColor="transparent" darkColor="transparent">
              <ThemedText 
                lightColor={colors.textSecondary} 
                darkColor={colors.textSecondary}
                className="text-sm"
              >
                {contact.address}
              </ThemedText>
            </ThemedView>
          ) : null}

          {contact.phone ? (
            <ThemedView className="mb-2 px-2 w-full" lightColor="transparent" darkColor="transparent">
              <ThemedText 
                lightColor={colors.textSecondary} 
                darkColor={colors.textSecondary}
                className="text-sm"
              >
                📞 {contact.phone}
              </ThemedText>
            </ThemedView>
          ) : null}

          <ThemedView className="w-full px-2" lightColor="transparent" darkColor="transparent">
            <ThemedText 
              lightColor={colors.textSecondary} 
              darkColor={colors.textSecondary}
              className="text-xs"
            >
              {t.contacts.created}: {new Date(contact.created).toLocaleDateString()}
            </ThemedText>
            <ThemedText 
              lightColor={colors.textSecondary} 
              darkColor={colors.textSecondary}
              className="text-xs"
            >
              {t.contacts.lastEdited}: {new Date(contact.lastEdited).toLocaleDateString()}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </TouchableOpacity>
    </Link>
  );
}
