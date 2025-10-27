import { SelectionModal } from '@/components/SelectionModal';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useTranslation } from '@/hooks/useTranslation';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type SettingsItemProps = {
  title: string;
  value: string;
  onPress: () => void;
  icon: keyof typeof Ionicons.glyphMap;
};

function SettingsItem({ title, value, onPress, icon }: SettingsItemProps) {
  const { colorScheme } = useTheme();
  const colors = Colors[colorScheme];

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between p-4 rounded-xl mb-3"
      style={{ backgroundColor: colors.cardBackground }}
      activeOpacity={0.7}
    >
      <ThemedView className="flex-row items-center flex-1" lightColor="transparent" darkColor="transparent">
        <Ionicons name={icon} size={24} color={colors.tint} style={{ marginRight: 12 }} />
        <ThemedView lightColor="transparent" darkColor="transparent">
          <ThemedText className="text-base font-medium">{title}</ThemedText>
          <ThemedText 
            className="text-sm mt-1"
            lightColor={colors.textSecondary}
            darkColor={colors.textSecondary}
          >
            {value}
          </ThemedText>
        </ThemedView>
      </ThemedView>
      <Ionicons name="chevron-forward" size={20} color={colors.icon} />
    </TouchableOpacity>
  );
}

export default function Settings() {
  const { themeMode, colorScheme, setThemeMode } = useTheme();
  const { t, currentLanguage, changeLanguage } = useTranslation();
  const colors = Colors[colorScheme];
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const handleThemeChange = () => {
    setShowThemeModal(true);
  };

  const handleLanguageChange = () => {
    setShowLanguageModal(true);
  };

  const handleThemeSelect = (value: string) => {
    setThemeMode(value as 'light' | 'dark' | 'system');
  };

  const handleLanguageSelect = (value: string) => {
    changeLanguage(value);
  };

  const getThemeDisplayName = () => {
    switch (themeMode) {
      case 'light': return t.settings.themeLight;
      case 'dark': return t.settings.themeDark;
      case 'system': return t.settings.themeSystem;
      default: return t.settings.themeSystem;
    }
  };

  const getLanguageDisplayName = () => {
    switch (currentLanguage) {
      case 'en': return t.settings.languageEnglish;
      case 'sk': return t.settings.languageSlovak;
      default: return t.settings.languageEnglish;
    }
  };

  const themeOptions = [
    { label: t.settings.themeLight, value: 'light', isSelected: themeMode === 'light' },
    { label: t.settings.themeDark, value: 'dark', isSelected: themeMode === 'dark' },
    { label: t.settings.themeSystem, value: 'system', isSelected: themeMode === 'system' },
  ];

  const languageOptions = [
    { label: t.settings.languageEnglish, value: 'en', isSelected: currentLanguage === 'en' },
    { label: t.settings.languageSlovak, value: 'sk', isSelected: currentLanguage === 'sk' },
  ];

  return (
    <SafeAreaView 
      edges={['left', 'right', 'bottom']} 
      className="flex-1"
      style={{ backgroundColor: colors.background }}
    >
      <Stack.Screen options={{ title: t.settings.title }} />
      
      <ThemedView className="px-4 py-6 flex-1" lightColor="transparent" darkColor="transparent">
        <SettingsItem
          title={t.settings.theme}
          value={getThemeDisplayName()}
          onPress={handleThemeChange}
          icon="color-palette"
        />
        
        <SettingsItem
          title={t.settings.language}
          value={getLanguageDisplayName()}
          onPress={handleLanguageChange}
          icon="language"
        />
      </ThemedView>

      <SelectionModal
        visible={showThemeModal}
        title={t.settings.theme}
        options={themeOptions}
        onSelect={handleThemeSelect}
        onClose={() => setShowThemeModal(false)}
      />

      <SelectionModal
        visible={showLanguageModal}
        title={t.settings.language}
        options={languageOptions}
        onSelect={handleLanguageSelect}
        onClose={() => setShowLanguageModal(false)}
      />
    </SafeAreaView>
  );
}