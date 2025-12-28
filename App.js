import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import NotesListScreen from './src/screens/NotesListScreen';
import AddNoteScreen from './src/screens/AddNoteScreen';
import NoteDetailsScreen from './src/screens/NoteDetailsScreen';

export default function App() {
  const [screen, setScreen] = useState('list');
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  function addNote(note) {
    setNotes(prev => [note, ...prev]);
    setScreen('list');
  }

  let content = null;

  if (screen === 'list') {
    content = (
      <NotesListScreen
        notes={notes}
        onAdd={() => setScreen('add')}
        onSelect={note => {
          setSelectedNote(note);
          setScreen('details');
        }}
      />
    );
  }

  if (screen === 'add') {
    content = (
      <AddNoteScreen
        onSave={addNote}
        onCancel={() => setScreen('list')}
      />
    );
  }

  if (screen === 'details') {
    content = (
      <NoteDetailsScreen
        note={selectedNote}
        onBack={() => setScreen('list')}
      />
    );
  }

  return <SafeAreaView style={styles.container}>{content}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
