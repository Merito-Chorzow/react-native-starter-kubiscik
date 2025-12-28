import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';

type Note = {
  title: string;
  createdAt: string;
};

// 🔹 GLOBALNY STAN (NIE ZNIKA PRZY NAWIGACJI)
let NOTES_STORE: Note[] = [];

export default function NotesListScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [notes, setNotes] = useState<Note[]>(NOTES_STORE);
  const noteAddedRef = useRef(false);

  useEffect(() => {
    if (
      params.title &&
      params.createdAt &&
      typeof params.title === 'string' &&
      typeof params.createdAt === 'string' &&
      !noteAddedRef.current
    ) {
      const newNote = {
        title: params.title,
        createdAt: params.createdAt,
      };

      NOTES_STORE = [newNote, ...NOTES_STORE]; // ✅ zapisz globalnie
      setNotes(NOTES_STORE);                  // ✅ odśwież widok
      noteAddedRef.current = true;
    }
  }, [params]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Field Notes</Text>

      <FlatList
        data={notes}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={
          <Text style={styles.empty}>Brak notatek</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.note}>
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteDate}>{item.createdAt}</Text>
          </View>
        )}
      />

      <Button
        title="Dodaj notatkę"
        onPress={() => {
          noteAddedRef.current = false;
          router.push('/add');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 16,
  },
  empty: {
    color: '#aaa',
    marginBottom: 16,
  },
  note: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#333',
  },
  noteTitle: {
    color: '#fff',
    fontSize: 16,
  },
  noteDate: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 4,
  },
});
