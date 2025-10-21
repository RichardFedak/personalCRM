import { ThemedText } from "@/components/themed-text";
import { Note } from "@/db/schema";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Text, View, TouchableOpacity, Alert, Pressable } from "react-native";

export default function Notes({ notes, contactId, onDelete }: { 
  notes: Note[] | undefined; 
  contactId: number; 
  onDelete: (id: number) => void; 
}) {
    const handleDelete = (note: Note) => {
        Alert.alert(
            "Delete Note",
            `Are you sure you want to delete "${note.title || 'this note'}"?`,
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: () => onDelete(note.id) },
            ]
        );
    };
    return (
        <>
            <ThemedText type="title" className="text-xl font-bold mb-4">
                Notes
            </ThemedText>

            {notes && notes.length > 0 ? (
                notes.map((note) => (
                    <Pressable
                        key={note.id}
                        className="mb-3 p-4 rounded-xl bg-gray-100 dark:bg-gray-800 shadow-sm"
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
                                <View className="flex-row justify-between items-start mb-1">
                                    <Text className="text-gray-800 dark:text-white font-semibold text-base flex-1">
                                        {note.title || "Untitled Note"}
                                    </Text>
                                    <TouchableOpacity 
                                        onPress={(e) => {
                                            e.stopPropagation();
                                            handleDelete(note);
                                        }} 
                                        className="ml-2"
                                    >
                                        <Ionicons name="trash" size={20} color="red" />
                                    </TouchableOpacity>
                                </View>
                                {note.content && (
                                    <Text className="text-gray-600 dark:text-gray-300 text-sm mb-2" numberOfLines={2}>
                                        {note.content.length > 100 
                                            ? `${note.content.substring(0, 100)}...` 
                                            : note.content
                                        }
                                    </Text>
                                )}
                                <Text className="text-xs text-gray-500 dark:text-gray-400">
                                    Last Edited: {note.lastEdited}
                                </Text>
                            </Pressable>
                        </Link>
                    </Pressable>
                ))
            ) : (
                <Text className="text-gray-500 dark:text-gray-400">No notes yet</Text>
            )}
            <Link
                className="absolute bottom-6 right-6 bg-blue-500 p-4 rounded-full shadow-lg"
                href={`/note-new?contactId=${contactId}`}
            >
                <Ionicons name="add" size={28} color="white" />
            </Link>
        </>
    );
}