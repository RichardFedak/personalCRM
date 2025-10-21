import LabeledInput from "@/components/labeled-input";
import * as schema from "@/db/schema"; 
import { ThemedView } from "@/components/themed-view";
import { drizzle } from "drizzle-orm/expo-sqlite/driver";
import { useSQLiteContext } from "expo-sqlite";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { eq } from "drizzle-orm";

export default function NewNote(){

    const db = useSQLiteContext();
    const drizzleDb = drizzle(db, { schema });
    const router = useRouter();
    const { contactId, noteId, title: initialTitle, content: initialContent } = useLocalSearchParams<{ 
        contactId?: string; 
        noteId?: string;
        title?: string;
        content?: string;
    }>();
    
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const isEditing = !!noteId;

    // Initialize form with existing data when editing
    useEffect(() => {
        if (isEditing && initialTitle !== undefined && initialContent !== undefined) {
            setTitle(initialTitle);
            setContent(initialContent);
        }
    }, [isEditing, initialTitle, initialContent]);

    const handleSave = async () => {
        if (!title.trim()) {
            Alert.alert("Validation", "Please enter a title.");
            return;
        }

        if (!contactId) {
            Alert.alert("Error", "Contact ID is required to save a note.");
            return;
        }

        const now = new Date().toISOString();

        try {
            if (isEditing && noteId) {
                // Update existing note
                await drizzleDb
                    .update(schema.notes)
                    .set({
                        title,
                        content,
                        lastEdited: now,
                    })
                    .where(eq(schema.notes.id, Number(noteId)))
                    .run();

                Alert.alert("Success", "Note updated successfully.");
            } else {
                // Create new note
                await drizzleDb
                    .insert(schema.notes)
                    .values({
                        contactId: Number(contactId),
                        title,
                        content,
                        created: now,
                        lastEdited: now,
                    })
                    .run();

                Alert.alert("Success", "Note saved successfully.");
            }

            router.back();
        } catch (error) {
            console.error("Error saving note:", error);
            Alert.alert("Error", "Failed to save note.");
        }
    };

    return(
        <>
            <Stack.Screen options={{ title: isEditing ? "Edit Note" : "New Note" }} />
            <SafeAreaView
             edges={["left", "right", "bottom"]}
                className="flex-1 bg-white dark:bg-black px-4 py-6"
            >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <ScrollView contentContainerStyle={{ padding: 16 }}>
                    <ThemedView className="mb-4">
                        <LabeledInput
                            label="Title"
                            value={title}
                            onChangeText={setTitle}
                            placeholder="Enter note title"
                        />
                        <LabeledInput
                            label="Content"
                            value={content}
                            onChangeText={setContent}
                            placeholder="Enter note content"
                            multiline={true}
                            numberOfLines={8}
                        />

                        <TouchableOpacity
                            onPress={handleSave}
                            className="mt-6 bg-blue-500 rounded-lg px-4 py-3"
                        >
                            <Text className="text-white font-semibold">
                                {isEditing ? "Update Note" : "Save Note"}
                            </Text>
                        </TouchableOpacity>
                    </ThemedView>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
        </>
    )
}