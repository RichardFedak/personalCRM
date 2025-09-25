import { FlatList } from 'react-native';
import { Contact, ContactItem } from './ContactItem';

type ContactsListProps = {
  contacts: Contact[];
  onDelete: (id: number) => void; // receive the delete callback
};

export function ContactsList({ contacts, onDelete }: ContactsListProps) {
  return (
    <FlatList
      data={contacts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ContactItem contact={item} onDelete={onDelete} />
      )}
    />
  );
}
