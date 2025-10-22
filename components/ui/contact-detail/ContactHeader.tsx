import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import { Colors } from "@/constants/theme";

type ContactFieldProps = {
  label: string;
  value?: string | null;
};

function ContactField({ label, value }: ContactFieldProps) {
  const { colorScheme } = useTheme();
  const colors = Colors[colorScheme];

  return (
    <ThemedView className="mb-3" lightColor="transparent" darkColor="transparent">
      <ThemedText 
        className="text-sm font-semibold"
        lightColor={colors.textSecondary}
        darkColor={colors.textSecondary}
      >
        {label}
      </ThemedText>
      {value ? (
        <ThemedText className="mt-1 text-base">
          {value}
        </ThemedText>
      ) : (
        <ThemedText 
          className="mt-1 text-base italic"
          lightColor={colors.textPlaceholder}
          darkColor={colors.textPlaceholder}
        >
          No {label.toLowerCase()}
        </ThemedText>
      )}
    </ThemedView>
  );
}

type ContactHeaderProps = {
  address?: string | null;
  phone?: string | null;
};

export function ContactHeader({ address, phone }: ContactHeaderProps) {
  const { colorScheme } = useTheme();
  const colors = Colors[colorScheme];

  return (
    <ThemedView 
      className="mb-6 rounded-2xl p-4 shadow-sm border"
      lightColor={colors.headerBackground}
      darkColor={colors.headerBackground}
      style={{ borderColor: colors.headerBorder }}
    >
      <ContactField label="Address" value={address} />
      <ContactField label="Phone number" value={phone} />
    </ThemedView>
  );
}
