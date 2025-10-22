import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '@/hooks/use-theme';

export function ThemeSwitcher() {
  const { themeMode, setThemeMode } = useTheme();

  const getIconName = () => {
    switch (themeMode) {
      case 'light':
        return 'sunny';
      case 'dark':
        return 'moon';
      case 'system':
      default:
        return 'phone-portrait';
    }
  };

  const handleThemeSwitch = () => {
    Alert.alert(
      'Select Theme',
      'Choose your preferred theme',
      [
        {
          text: `${themeMode === 'system' ? '✓ ' : ''}System Default`,
          onPress: () => setThemeMode('system'),
          style: 'default',
        },
        {
          text: `${themeMode === 'light' ? '✓ ' : ''}Light Mode`,
          onPress: () => setThemeMode('light'),
          style: 'default',
        },
        {
          text: `${themeMode === 'dark' ? '✓ ' : ''}Dark Mode`,
          onPress: () => setThemeMode('dark'),
          style: 'default',
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  return (
    <TouchableOpacity onPress={handleThemeSwitch} className="p-2">
      <Ionicons 
        name={getIconName()} 
        size={24} 
        color="#007AFF" 
      />
    </TouchableOpacity>
  );
}