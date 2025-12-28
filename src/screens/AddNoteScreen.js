import { View, Text, TextInput, Button, StyleSheet, Platform } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function AddNoteScreen() {
  const [title, setTitle] = useState('');
  const router = useRouter();

  function saveNote() {
    if (!title.trim()) return;

    router.replace({
      pathname: '/',
      params: {
        id: Date.now().toString(),
        title,
        date: new Date().toLocaleString(),
      },
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dodaj notatkę</Text>

      <TextInput
        placeholder="Tytuł notatki"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#888"
        style={styles.input}
      />

      <Button title="Zapisz" onPress={saveNote} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#444',
    height: 48,
    fontSize: 16,
    lineHeight: 48,
    paddingHorizontal: 12,
    paddingVertical: 0,
    marginBottom: 16,
    borderRadius: 6,
    color: '#fff',
    ...(Platform.OS === 'web' ? { outlineStyle: 'none' } : {}),
  },
});
