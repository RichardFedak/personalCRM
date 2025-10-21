import { ThemedView } from "@/components/themed-view";
import { ContactHeader } from "@/components/ui/contact-detail/ContactHeader";
import Notes from "@/components/ui/contact-detail/Notes";
import * as schema from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { Stack, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const options = {
  title: "Contact details",

}

export default function ContactDetails() {
  const { userId } = useLocalSearchParams<{ userId: string }>();

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  const { data: contact } = useLiveQuery(
    drizzleDb
      .select()
      .from(schema.contacts)
      .where(eq(schema.contacts.id, Number(userId)))
      .limit(1)
  );

  const { data: notes } = useLiveQuery(
    drizzleDb
      .select()
      .from(schema.notes)
      .where(eq(schema.notes.contactId, Number(userId)))
      .orderBy(desc(schema.notes.lastEdited))
  );


  const handleDeleteNote = async (id: number) => {
    await drizzleDb.delete(schema.notes)
      .where(eq(schema.notes.id, id))
      .run();
  };

  if (!contact || contact.length === 0) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white dark:bg-black">
        <Text className="text-gray-500 dark:text-gray-300">Contact not found</Text>
      </SafeAreaView>
    );
  }

  const currentContact = contact[0];

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} className="flex-1 bg-white dark:bg-black">
      <Stack.Screen options={{ title: currentContact.name }} />
      <ThemedView className="px-4 flex-1">
        <ContactHeader
          address={currentContact.address}
          phone={currentContact.phone}
        />

        <Notes notes={notes} contactId={Number(userId)} onDelete={handleDeleteNote} />
        
      </ThemedView>
    </SafeAreaView>
  );
}
