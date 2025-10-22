import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';

import migrations from '@/drizzle/migrations';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { SQLiteProvider, openDatabaseSync } from 'expo-sqlite';
import React, { Suspense } from 'react';
import { ActivityIndicator } from 'react-native';

import { ThemeProvider, useTheme } from '@/hooks/use-theme';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

export const unstable_settings = {
  anchor: '(tabs)',
};

function AppContent() {
  const { colorScheme } = useTheme();
  const colors = Colors[colorScheme];
  const DATABASE_NAME = 'personalCRM';
  const expoDb = openDatabaseSync(DATABASE_NAME);
  const db = drizzle(expoDb);
  const { success, error } = useMigrations(db, migrations);

  return (
    <ThemedView 
      style={{ flex: 1 }}
      lightColor={colors.background}
      darkColor={colors.background}
    >
      <NavigationThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Suspense fallback={<ActivityIndicator size="large" color={colors.tint} />}>
          <SQLiteProvider
            databaseName={DATABASE_NAME}
            options={{ enableChangeListener: true }}
            useSuspense
          >
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
              <Stack.Screen name="contact-new/index" options={{ title: "New contact"}} />
              <Stack.Screen name="note-new/index" options={{ title: "New note"}} />
            </Stack>
          </SQLiteProvider>
        </Suspense>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      </NavigationThemeProvider>
    </ThemedView>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
