import { Ionicons } from '@expo/vector-icons';
import { TextInput, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { Colors } from '@/constants/theme';

type ContactsFilterProps = {
  search: string;
  setSearch: (val: string) => void;
  sortBy: 'lastEdited' | 'created';
  setSortBy: (val: 'lastEdited' | 'created') => void;
};

export function ContactsFilter({ search, setSearch, sortBy, setSortBy }: ContactsFilterProps) {
  const { colorScheme } = useTheme();
  const colors = Colors[colorScheme];

  return (
    <ThemedView className="flex-row items-center mb-4" lightColor="transparent" darkColor="transparent">
      <ThemedView 
        className="flex-1 flex-row items-center rounded-xl px-3"
        lightColor={colors.searchBackground}
        darkColor={colors.searchBackground}
      >
        <Ionicons name="search" size={18} color={colors.iconSecondary} />
        <TextInput
          placeholder="Search by name..."
          placeholderTextColor={colors.inputPlaceholder}
          className="flex-1 px-2 py-2"
          style={{ 
            color: colors.inputText
          }}
          value={search}
          onChangeText={setSearch}
        />
      </ThemedView>

      <ThemedView 
        className="ml-3 flex-row items-center rounded-xl p-1"
        lightColor={colors.searchBackground}
        darkColor={colors.searchBackground}
      >
        <Ionicons name="swap-vertical" size={16} color={colors.iconSecondary} style={{ marginRight: 6 }} />
        {['lastEdited', 'created'].map((option) => (
          <TouchableOpacity
            key={option}
            className="px-3 py-1 rounded-lg"
            style={{
              backgroundColor: sortBy === option ? colors.buttonSelected : 'transparent'
            }}
            onPress={() => setSortBy(option as 'lastEdited' | 'created')}
          >
            <ThemedText
              className="text-sm font-medium"
              lightColor={sortBy === option ? '#ffffff' : colors.buttonText}
              darkColor={sortBy === option ? '#ffffff' : colors.buttonText}
            >
              {option === 'lastEdited' ? 'Last Edited' : 'Created'}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ThemedView>
    </ThemedView>
  );
}
