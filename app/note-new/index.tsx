import LabeledInput from "@/components/labeled-input";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import * as schema from "@/db/schema";
import { useTheme } from "@/hooks/use-theme";
import { useTranslation } from "@/hooks/useTranslation";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/expo-sqlite/driver";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewNote(){

    const db = useSQLiteContext();
    const drizzleDb = drizzle(db, { schema });
    const router = useRouter();
    const { colorScheme } = useTheme();
    const { t } = useTranslation();
    const colors = Colors[colorScheme];
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
            Alert.alert(t.validation.noteTitleRequired, t.validation.noteTitleRequired);
            return;
        }

        if (!contactId) {
            Alert.alert(t.common.error, t.validation.noteContactIdRequired);
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

                Alert.alert(t.common.success, t.notes.noteUpdatedMessage);
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

                Alert.alert(t.common.success, t.notes.noteCreatedMessage);
            }

            router.back();
        } catch (error) {
            console.error("Error saving note:", error);
            Alert.alert(t.common.error, isEditing ? t.notes.noteUpdateFailedMessage : t.notes.noteCreationFailedMessage);
        }
    };

    return(
        <>
            <Stack.Screen options={{ title: isEditing ? t.common.edit + " " + t.notes.title : t.notes.newNote }} />
            <SafeAreaView
             edges={["left", "right", "bottom"]}
                style={{ backgroundColor: colors.background }}
                className="flex-1 px-4 py-6"
            >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <ScrollView contentContainerStyle={{ padding: 16 }}>
                    <ThemedView className="mb-4" lightColor="transparent" darkColor="transparent">
                        <LabeledInput
                            label={t.notes.title}
                            value={title}
                            onChangeText={setTitle}
                            placeholder={t.notes.noteContentPlaceholder}
                        />
                        <LabeledInput
                            label={t.notes.noteContent}
                            value={content}
                            onChangeText={setContent}
                            placeholder={t.notes.noteContentPlaceholder}
                            multiline={true}
                            numberOfLines={8}
                        />

                        <TouchableOpacity
                            onPress={handleSave}
                            className="mt-6 rounded-lg px-4 py-3"
                            style={{ backgroundColor: colors.primary }}
                        >
                            <ThemedText 
                                className="font-semibold text-center"
                                lightColor="white"
                                darkColor="white"
                            >
                                {isEditing ? t.common.edit : t.common.save}
                            </ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
        </>
    )
}