import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useTranslation } from "@/hooks/useTranslation";
import { Ionicons } from '@expo/vector-icons';
import { Dimensions, Modal, ScrollView, StatusBar, TouchableOpacity, View } from 'react-native';

type SelectionOption = {
  label: string;
  value: string;
  isSelected: boolean;
};

type SelectionModalProps = {
  visible: boolean;
  title: string;
  options: SelectionOption[];
  onSelect: (value: string) => void;
  onClose: () => void;
};

export function SelectionModal({ visible, title, options, onSelect, onClose }: SelectionModalProps) {
  const { colorScheme } = useTheme();
  const colors = Colors[colorScheme];
  const screenHeight = Dimensions.get('screen').height;
  const statusBarHeight = StatusBar.currentHeight || 0;
  const { t } = useTranslation();

  const handleSelect = (value: string) => {
    onSelect(value);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View 
        style={{ 
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'flex-end',
          paddingTop: statusBarHeight,
        }}
      >
        <TouchableOpacity 
          style={{ flex: 1 }}
          onPress={onClose} 
          activeOpacity={1}
        />
        
        <ThemedView
          className="rounded-t-3xl px-6 py-6"
          style={{ 
            backgroundColor: colors.background,
            maxHeight: screenHeight * 0.6,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.15,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          <ThemedView className="w-12 h-1 rounded-full self-center mb-4" style={{ backgroundColor: colors.textMuted }} />
          
          <ThemedText className="text-xl font-bold text-center mb-6">
            {title}
          </ThemedText>
          
          <ScrollView showsVerticalScrollIndicator={false}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => handleSelect(option.value)}
                className="flex-row items-center justify-between py-4 px-4 rounded-xl mb-2"
                style={{ 
                  backgroundColor: option.isSelected ? colors.primary + '20' : colors.cardBackground,
                  borderWidth: option.isSelected ? 2 : 0,
                  borderColor: option.isSelected ? colors.primary : 'transparent',
                }}
                activeOpacity={0.7}
              >
                <ThemedText 
                  className="text-lg font-medium"
                  style={{ 
                    color: option.isSelected ? colors.primary : colors.text 
                  }}
                >
                  {option.label}
                </ThemedText>
                
                {option.isSelected && (
                  <Ionicons 
                    name="checkmark-circle" 
                    size={24} 
                    color={colors.primary} 
                  />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          <TouchableOpacity
            onPress={onClose}
            className="mt-4 py-4 rounded-xl"
            style={{ backgroundColor: colors.textMuted + '20' }}
            activeOpacity={0.7}
          >
            <ThemedText className="text-center text-lg font-medium">
              {t.common.cancel}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </View>
    </Modal>
  );
}