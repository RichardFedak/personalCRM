import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ContactsFilter } from '@/components/ui/contacts/ContactsFilter';
import { ContactsList } from '@/components/ui/contacts/ContactsList';
import { Colors } from '@/constants/theme';
import * as schema from '@/db/schema';
import { useTheme } from '@/hooks/use-theme';
import { useTranslation } from '@/hooks/useTranslation';
import { Ionicons } from '@expo/vector-icons';
import { desc, eq } from 'drizzle-orm';
import { drizzle, useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { Link, useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import 'react-native-get-random-values';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function HomeScreen() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  const { t } = useTranslation();
  const { colorScheme } = useTheme();
  const colors = Colors[colorScheme];
  const router = useRouter();

  const { data: contacts } = useLiveQuery(
    drizzleDb.select().from(schema.contacts)
      .orderBy(desc(schema.contacts.lastEdited))
  );


  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'lastEdited' | 'created'>('lastEdited');

  const filteredContacts = useMemo(() => {
    return (contacts || [])
      .filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === 'lastEdited') {
          return new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime();
        }
        return new Date(b.created).getTime() - new Date(a.created).getTime();
      });
  }, [contacts, search, sortBy]);
  
  const handleDeleteContact = async (id: number) => {
    await drizzleDb.delete(schema.contacts)
      .where(eq(schema.contacts.id, id))
      .run();
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <ThemedView className="px-4 py-6">
        <View className="flex-row justify-between items-center mb-4">
          <ThemedText type="title" className="text-3xl font-bold">
            {t.contacts.title}
          </ThemedText>
          <TouchableOpacity 
            className="p-2 rounded-full" 
            activeOpacity={0.7}
            onPress={() => router.push('/settings' as any)}
          >
            <Ionicons name="settings-outline" size={24} color={colors.tint} />
          </TouchableOpacity>
        </View>

        <ContactsFilter
          search={search}
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <ContactsList
          contacts={filteredContacts}
          onDelete={handleDeleteContact}
        />
      </ThemedView>

      <Link
        className="absolute bottom-6 right-6 bg-blue-500 p-4 rounded-full shadow-lg"
        href="/contact-new"
      >
        <Ionicons name="add" size={28} color="white" />
      </Link>

    </SafeAreaView>
  );
}