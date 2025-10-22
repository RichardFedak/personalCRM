/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#0a7ea4'; // Changed from '#fff' to use the same blue color

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    // Contact card colors
    cardBackground: '#f3f4f6',
    textSecondary: '#6b7280',
    // UI element colors
    destructive: '#ef4444',
    // Additional semantic colors
    headerBackground: '#f9fafb',
    headerBorder: '#e5e7eb',
    noteBackground: '#f3f4f6',
    textMuted: '#9ca3af',
    textPlaceholder: '#d1d5db',
    success: '#10b981',
    primary: '#3b82f6',
    // Input colors
    inputBackground: '#ffffff',
    inputBorder: '#d1d5db',
    inputText: '#111827',
    inputPlaceholder: '#9ca3af',
    labelText: '#4b5563',
    // Filter/Search colors
    searchBackground: '#f3f4f6',
    iconSecondary: '#888888',
    buttonSelected: '#3b82f6',
    buttonText: '#374151',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    // Contact card colors
    cardBackground: '#374151',
    textSecondary: '#9ca3af',
    // UI element colors
    destructive: '#ef4444',
    // Additional semantic colors
    headerBackground: '#1f2937',
    headerBorder: '#374151',
    noteBackground: '#1f2937',
    textMuted: '#6b7280',
    textPlaceholder: '#4b5563',
    success: '#10b981',
    primary: '#3b82f6',
    // Input colors
    inputBackground: '#1f2937',
    inputBorder: '#374151',
    inputText: '#f3f4f6',
    inputPlaceholder: '#6b7280',
    labelText: '#d1d5db',
    // Filter/Search colors
    searchBackground: '#374151',
    iconSecondary: '#888888',
    buttonSelected: '#3b82f6',
    buttonText: '#d1d5db',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
