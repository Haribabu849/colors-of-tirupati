import DateTimePicker from '@react-native-community/datetimepicker';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Snackbar, Switch, Text, TextInput, Title } from 'react-native-paper';
import { db } from '../../firebaseConfig';

export default function UploadStatsForm() {
  const [form, setForm] = useState({
    date: '',
    pilgrims: '',
    tonsures: '',
    hundi: '',
    compartments: '',
    darshan: '',
    has_ssd_token: false, // 🔥 New field
  });
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [dateObj, setDateObj] = useState(new Date());

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleDateChange = (_event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDateObj(selectedDate);
      // Format as YYYY-MM-DD for display (no time)
      const yyyy = selectedDate.getFullYear();
      const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const dd = String(selectedDate.getDate()).padStart(2, '0');
      setForm({ ...form, date: `${yyyy}-${mm}-${dd}` });
    }
    setDatePickerVisible(false);
  };

  const handleSubmit = async () => {
    if (!form.date) return alert("Please enter a date!");

    setLoading(true);
    try {
      const timestampDate = Timestamp.fromDate(new Date(form.date));

      await addDoc(collection(db, 'tirumala_daily_stats'), {
        date: timestampDate,
        pilgrims: parseInt(form.pilgrims),
        tonsures: parseInt(form.tonsures),
        hundi_kanukalu: parseFloat(form.hundi),
        waiting_compartments: parseInt(form.compartments),
        darshan_time_hours: parseInt(form.darshan),
        has_ssd_token: form.has_ssd_token, // ✅ Include boolean field
      });

      setSnack(true);
      setForm({
        date: '',
        pilgrims: '',
        tonsures: '',
        hundi: '',
        compartments: '',
        darshan: '',
        has_ssd_token: false,
      });
    } catch (err) {
      console.error('Error uploading:', err);
      alert("Upload failed. Check console for error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>Tirumala Daily Darshan Stats</Title>

      {/* Date Picker Button (date only) */}
      <Button mode="outlined" onPress={() => { setMode('date'); setDatePickerVisible(true); }} style={styles.input}>
        {dateObj ? `Date: ${dateObj.toLocaleDateString()}` : 'Pick Date'}
      </Button>
      {datePickerVisible && (
        <DateTimePicker
          value={dateObj}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <TextInput
        label="Total Pilgrims"
        keyboardType="numeric"
        value={form.pilgrims}
        onChangeText={(text) => handleChange('pilgrims', text)}
        style={styles.input}
      />
      <TextInput
        label="Tonsures"
        keyboardType="numeric"
        value={form.tonsures}
        onChangeText={(text) => handleChange('tonsures', text)}
        style={styles.input}
      />
      <TextInput
        label="Hundi Kanukalu (in Cr)"
        keyboardType="numeric"
        value={form.hundi}
        onChangeText={(text) => handleChange('hundi', text)}
        style={styles.input}
      />
      <TextInput
        label="Waiting Compartments"
        keyboardType="numeric"
        value={form.compartments}
        onChangeText={(text) => handleChange('compartments', text)}
        style={styles.input}
      />
      <TextInput
        label="Darshan Time (Hours)"
        keyboardType="numeric"
        value={form.darshan}
        onChangeText={(text) => handleChange('darshan', text)}
        style={styles.input}
      />

      {/* 🔁 Switch for SSD Token */}
      <View style={styles.switchContainer}>
        <Text style={{ marginRight: 10 }}>Has SSD Token</Text>
        <Switch
          value={form.has_ssd_token}
          onValueChange={(val) => handleChange('has_ssd_token', val)}
        />
      </View>

      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Upload
      </Button>

      <Snackbar
        visible={snack}
        onDismiss={() => setSnack(false)}
        duration={3000}
      >
        Data uploaded successfully!
      </Snackbar>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1
  },
  title: {
    textAlign: 'center',
    marginBottom: 20
  },
  input: {
    marginBottom: 15
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  button: {
    marginTop: 20
  }
});
