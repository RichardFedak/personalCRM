import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useTranslation } from "@/hooks/useTranslation";

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
  const { t } = useTranslation();
  const colors = Colors[colorScheme];

  return (
    <ThemedView 
      className="mb-6 rounded-2xl p-4 shadow-sm border"
      lightColor={colors.headerBackground}
      darkColor={colors.headerBackground}
      style={{ borderColor: colors.headerBorder }}
    >
      <ContactField label={t.contactForm.address} value={address} />
      <ContactField label={t.contactForm.phone} value={phone} />
    </ThemedView>
  );
}
