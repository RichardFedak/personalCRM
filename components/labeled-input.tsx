import { Text, TextInput } from "react-native";
import { ThemedView } from "./themed-view";


type LabeledInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  multiline?: boolean;
  numberOfLines?: number;
}

export default function LabeledInput({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  multiline = false,
  numberOfLines = 1,
}: LabeledInputProps) {
  return (
    <ThemedView className="mb-5">
      <Text className="mb-2 text-sm font-semibold text-gray-600 dark:text-gray-300">
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : 1}
        className={`border border-gray-300 dark:border-gray-700 rounded-2xl p-4 text-base text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 ${
          multiline ? 'min-h-[100px] text-top' : ''
        }`}
        placeholderTextColor="#999"
        style={multiline ? { textAlignVertical: 'top' } : undefined}
      />
    </ThemedView>
  );
}