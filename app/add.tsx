import { View, Text, TextInput, Button, StyleSheet, Platform } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function AddNoteScreen() {
  const [title, setTitle] = useState('');
  const router = useRouter();

  function saveNote() {
    if (title.trim().length === 0) return;

    const now = new Date();
    const formattedDate = now.toLocaleString('pl-PL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    router.replace({
      pathname: '/',
      params: {
        title,
        createdAt: formattedDate,
      },
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dodaj notatkę</Text>

      <TextInput
        placeholder="Tytuł notatki"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholderTextColor="#888"
      />

      <Button title="Zapisz" onPress={saveNote} />
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
    fontSize: 22,
    marginBottom: 16,
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#444',
    height: 48,
    fontSize: 16,
    lineHeight: 48,
    paddingHorizontal: 12,
    paddingVertical: 0,
    color: '#fff',
    backgroundColor: '#111',
    borderRadius: 6,
    marginBottom: 16,
    ...(Platform.OS === 'web' ? { outlineStyle: 'none' } : {}),
  },
});
