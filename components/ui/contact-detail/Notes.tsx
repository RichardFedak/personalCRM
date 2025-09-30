import { ThemedText } from "@/components/themed-text";
import { Note } from "@/db/schema";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Notes({ notes }: { notes: Note[] | undefined }) {
    return (
        <>
            <ThemedText type="title" className="text-xl font-bold mb-4">
                Notes
            </ThemedText>

            {notes && notes.length > 0 ? (
                notes.map((note) => (
                    <View
                        key={note.id}
                        className="mb-3 p-4 rounded-xl bg-gray-100 dark:bg-gray-800 shadow-sm"
                    >
                        <Text className="text-gray-800 dark:text-white">
                            {note.content}
                        </Text>
                        <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Last Edited: {note.lastEdited}
                        </Text>
                    </View>
                ))
            ) : (
                <Text className="text-gray-500 dark:text-gray-400">No notes yet</Text>
            )}
            <Link
                className="absolute bottom-6 right-6 bg-blue-500 p-4 rounded-full shadow-lg"
                href="note-new"
            >
                <Ionicons name="add" size={28} color="white" />
            </Link>
        </>
    );
}