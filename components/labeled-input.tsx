import { TextInput } from "react-native";
import { ThemedView } from "./themed-view";
import { ThemedText } from "./themed-text";
import { useTheme } from "@/hooks/use-theme";
import { Colors } from "@/constants/theme";

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
  const { colorScheme } = useTheme();
  const colors = Colors[colorScheme];

  return (
    <ThemedView className="mb-5" lightColor="transparent" darkColor="transparent">
      <ThemedText 
        className="mb-2 text-sm font-semibold"
        lightColor={colors.labelText}
        darkColor={colors.labelText}
      >
        {label}
      </ThemedText>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : 1}
        className={`border rounded-2xl p-4 text-base ${
          multiline ? 'min-h-[100px] text-top' : ''
        }`}
        style={{
          backgroundColor: colors.inputBackground,
          borderColor: colors.inputBorder,
          color: colors.inputText,
          textAlignVertical: multiline ? 'top' : 'center'
        }}
        placeholderTextColor={colors.inputPlaceholder}
      />
    </ThemedView>
  );
}