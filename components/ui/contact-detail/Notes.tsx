import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { Note } from "@/db/schema";
import { useTheme } from "@/hooks/use-theme";
import { useTranslation } from "@/hooks/useTranslation";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Alert, Pressable, TouchableOpacity } from "react-native";

export default function Notes({ notes, contactId, onDelete }: { 
  notes: Note[] | undefined; 
  contactId: number; 
  onDelete: (id: number) => void; 
}) {
    const { colorScheme } = useTheme();
    const { t } = useTranslation();
    const colors = Colors[colorScheme];

    const handleDelete = (note: Note) => {
        Alert.alert(
            t.common.delete,
            `Are you sure you want to delete "${note.title || 'this note'}"?`,
            [
                { text: t.common.cancel, style: "cancel" },
                { text: t.common.delete, style: "destructive", onPress: () => onDelete(note.id) },
            ]
        );
    };
    return (
        <>
            <ThemedText type="title" className="text-xl font-bold mb-4">
                {t.notes.title}
            </ThemedText>

            {notes && notes.length > 0 ? (
                notes.map((note) => (
                    <Pressable
                        key={note.id}
                        className="mb-3 p-4 rounded-xl shadow-sm"
                        style={{ backgroundColor: colors.noteBackground }}
                        onPress={() => {
                            // Navigate to edit note
                        }}
                    >
                        <Link
                            href={{
                                pathname: "/note-new",
                                params: {
                                    contactId: contactId.toString(),
                                    noteId: note.id.toString(),
                                    title: note.title || "",
                                    content: note.content || "",
                                }
                            }}
                            asChild
                        >
                            <Pressable>
                                <ThemedView className="flex-row justify-between items-start mb-1" lightColor="transparent" darkColor="transparent">
                                    <ThemedText className="font-semibold text-base flex-1">
                                        {note.title || t.notes.newNote}
                                    </ThemedText>
                                    <TouchableOpacity 
                                        onPress={(e) => {
                                            e.stopPropagation();
                                            handleDelete(note);
                                        }} 
                                        className="ml-2"
                                    >
                                        <Ionicons name="trash" size={20} color={colors.destructive} />
                                    </TouchableOpacity>
                                </ThemedView>
                                {note.content && (
                                    <ThemedText 
                                        className="text-sm mb-2" 
                                        numberOfLines={2}
                                        lightColor={colors.textSecondary}
                                        darkColor={colors.textSecondary}
                                    >
                                        {note.content.length > 100 
                                            ? `${note.content.substring(0, 100)}...` 
                                            : note.content
                                        }
                                    </ThemedText>
                                )}
                                <ThemedText 
                                    className="text-xs"
                                    lightColor={colors.textMuted}
                                    darkColor={colors.textMuted}
                                >
                                    {t.contacts.lastEdited}: {note.lastEdited}
                                </ThemedText>
                            </Pressable>
                        </Link>
                    </Pressable>
                ))
            ) : (
                <ThemedText 
                    lightColor={colors.textMuted}
                    darkColor={colors.textMuted}
                >
                    {t.notes.noNotes}
                </ThemedText>
            )}
            <Link
                className="absolute bottom-6 right-6 p-4 rounded-full shadow-lg"
                style={{ backgroundColor: colors.primary }}
                href={`/note-new?contactId=${contactId}`}
            >
                <Ionicons name="add" size={28} color="white" />
            </Link>
        </>
    );
}