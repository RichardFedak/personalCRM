import { Ionicons } from '@expo/vector-icons';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

type ContactsFilterProps = {
  search: string;
  setSearch: (val: string) => void;
  sortBy: 'lastEdited' | 'created';
  setSortBy: (val: 'lastEdited' | 'created') => void;
};

export function ContactsFilter({ search, setSearch, sortBy, setSortBy }: ContactsFilterProps) {
  return (
    <View className="flex-row items-center mb-4">
      <View className="flex-1 flex-row items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-3">
        <Ionicons name="search" size={18} color="#888" />
        <TextInput
          placeholder="Search by name..."
          placeholderTextColor="#888"
          className="flex-1 px-2 py-2 text-gray-900 dark:text-white"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View className="ml-3 flex-row items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
        <Ionicons name="swap-vertical" size={16} color="#888" style={{ marginRight: 6 }} />
        {['lastEdited', 'created'].map((option) => (
          <TouchableOpacity
            key={option}
            className={`px-3 py-1 rounded-lg ${
              sortBy === option ? 'bg-blue-500' : 'bg-transparent'
            }`}
            onPress={() => setSortBy(option as 'lastEdited' | 'created')}
          >
            <Text
              className={`text-sm font-medium ${
                sortBy === option ? 'text-white' : 'text-gray-800 dark:text-gray-200'
              }`}
            >
              {option === 'lastEdited' ? 'Last Edited' : 'Created'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
