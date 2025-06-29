import { router } from 'expo-router';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Snackbar, TextInput, Title } from 'react-native-paper';
import { db } from '../../firebaseConfig';

export default function UploadNewsForm() {
  const [form, setForm] = useState({
    news_header: '',
    news_content: '',
  });
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState(false);
  // const router = useRouter();

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    if (!form.news_header || !form.news_content) {
      alert("Please fill both header and content!");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'local_news'), {
        news_header: form.news_header,
        news_content: form.news_content,
        date: Timestamp.now(),
      });

      setSnack(true);
      setForm({
        news_header: '',
        news_content: '',
      });
    } catch (err) {
      console.error("Error uploading news:", err);
      alert("Upload failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>Upload Local News</Title>

      <TextInput
        label="News Header"
        value={form.news_header}
        onChangeText={(text) => handleChange('news_header', text)}
        style={styles.input}
      />

      <TextInput
        label="News Content"
        value={form.news_content}
        onChangeText={(text) => handleChange('news_content', text)}
        multiline
        numberOfLines={6}
        style={[styles.input, { height: 150 }]}
      />

      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Upload News
      </Button>

      <Snackbar
        visible={snack}
        onDismiss={() => setSnack(false)}
        duration={3000}
      >
        News uploaded successfully!
      </Snackbar>
      
      <Button
        mode="contained"
        onPress={()=> router.push('/hundi')}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Upload News
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
  },
});
