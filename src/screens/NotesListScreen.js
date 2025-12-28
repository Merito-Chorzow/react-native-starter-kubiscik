import { View, Text, FlatList, Button, StyleSheet, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

type Note = {
  id: string;
  title: string;
  date: string;
};

export default function NotesListScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const router = useRouter();

  async function fetchNotesFromApi() {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts?_limit=5'
      );
      const data = await response.json();

      const apiNotes: Note[] = data.map((item: any) => ({
        id: `api-${item.id}`,
        title: item.title,
        date: new Date().toLocaleString(),
      }));

      // ✅ doklejamy, NIE nadpisujemy
      setNotes(prev => [...apiNotes, ...prev]);
    } catch (error) {
      alert('Błąd pobierania danych z API');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Field Notes</Text>

      <Button title="Pobierz notatki z API" onPress={fetchNotesFromApi} />

      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: '/details',
                params: item,
              })
            }
          >
            <View style={styles.note}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Brak notatek</Text>
        }
      />

      <Button
        title="Dodaj notatkę"
        onPress={() => router.push('/add')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 26, fontWeight: 'bold', marginBottom: 12 },
  note: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#333',
  },
  title: { fontSize: 18, color: '#fff' },
  date: { color: '#aaa', fontSize: 12 },
  empty: { marginTop: 20, textAlign: 'center', color: '#aaa' },
});
