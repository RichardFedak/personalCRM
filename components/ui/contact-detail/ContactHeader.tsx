import { Text, View } from "react-native";

type ContactHeaderProps = {
  address?: string | null;
};

export function ContactHeader({ address }: ContactHeaderProps) {
  return (
    <View className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 shadow-sm">
      {address ? (
        <Text className="text-base text-gray-600 dark:text-gray-300">
          {address}
        </Text>
      ) : (
        <Text className="text-base italic text-gray-400">No address</Text>
      )}
    </View>
  );
}
