import { Text, View } from "react-native";

type ContactFieldProps = {
  label: string;
  value?: string | null;
};

function ContactField({ label, value }: ContactFieldProps) {
  return (
    <View className="mb-3">
      <Text className="text-sm font-semibold text-gray-500 dark:text-gray-400">
        {label}
      </Text>
      {value ? (
        <Text className="mt-1 text-base text-gray-800 dark:text-gray-200">
          {value}
        </Text>
      ) : (
        <Text className="mt-1 text-base italic text-gray-400">
          No {label.toLowerCase()}
        </Text>
      )}
    </View>
  );
}

type ContactHeaderProps = {
  address?: string | null;
  phone?: string | null;
};

export function ContactHeader({ address, phone }: ContactHeaderProps) {
  return (
    <View className="mb-6 rounded-2xl p-4 bg-gray-50 dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-700">
      <ContactField label="Address" value={address} />
      <ContactField label="Phone number" value={phone} />
    </View>
  );
}
