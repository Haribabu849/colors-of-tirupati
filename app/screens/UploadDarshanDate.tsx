import DateTimePicker from '@react-native-community/datetimepicker';
import { collection, doc, getDocs, Timestamp, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Menu, Provider as PaperProvider, Snackbar, Title } from 'react-native-paper';
import { db } from '../../firebaseConfig';

// Define the type for documentList
interface DarshanDoc { id: string; label: string; }

export default function UpdateDarshanDate() {
  const [documentList, setDocumentList] = useState<DarshanDoc[]>([]);
  const [selectedId, setSelectedId] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [newDate, setNewDate] = useState('');
  const [snack, setSnack] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [dateObj, setDateObj] = useState(new Date());
  const [mode, setMode] = useState<'date' | 'time'>('date');

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'darshan_dates'));
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          label: doc.data().darshan_type || doc.id,
        }));
        setDocumentList(docs);
      } catch (err) {
        console.error('Error fetching docs:', err);
      }
    };
    fetchDocuments();
  }, []);

  const handleUpdate = async () => {
    if (!selectedId || !newDate) {
      alert('Select a darshan type and enter a date.');
      return;
    }

    try {
      const docRef = doc(db, 'darshan_dates', selectedId);
      await updateDoc(docRef, {
        date: Timestamp.fromDate(new Date(newDate)),
      });

      setSnack(true);
      setNewDate('');
      setSelectedId('');
      setSelectedLabel('');
    } catch (err) {
      console.error('Error updating date:', err);
      alert('Failed to update date.');
    }
  };

  const handleDateChange = (_event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDateObj(selectedDate);
      // Format as YYYY-MM-DD HH:mm for display
      const yyyy = selectedDate.getFullYear();
      const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const dd = String(selectedDate.getDate()).padStart(2, '0');
      const hh = String(selectedDate.getHours()).padStart(2, '0');
      const min = String(selectedDate.getMinutes()).padStart(2, '0');
      setNewDate(`${yyyy}-${mm}-${dd} ${hh}:${min}`);
    }
    setDatePickerVisible(false);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Title style={{ marginBottom: 20 }}>Update Darshan Date</Title>

        {/* Dropdown for darshan type */}
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Button mode="outlined" onPress={() => setMenuVisible(true)}>
              {selectedLabel || 'Select Darshan Type'}
            </Button>
          }
        >
          {documentList.map((doc) => (
            <Menu.Item
              key={doc.id}
              onPress={() => {
                setSelectedId(doc.id);
                setSelectedLabel(doc.label);
                setMenuVisible(false);
              }}
              title={doc.label}
            />
          ))}
        </Menu>

        {/* Date & Time Picker Buttons */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button mode="outlined" onPress={() => { setMode('date'); setDatePickerVisible(true); }} style={[styles.input, { flex: 1, marginRight: 5 }]}> 
            {dateObj ? `Date: ${dateObj.toLocaleDateString()}` : 'Pick Date'}
          </Button>
          <Button mode="outlined" onPress={() => { setMode('time'); setDatePickerVisible(true); }} style={[styles.input, { flex: 1, marginLeft: 5 }]}> 
            {dateObj ? `Time: ${dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Pick Time'}
          </Button>
        </View>
        {datePickerVisible && (
          <DateTimePicker
            value={dateObj}
            mode={mode}
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Button mode="contained" onPress={handleUpdate} style={styles.button}>
          Update Date
        </Button>

        <Snackbar visible={snack} onDismiss={() => setSnack(false)} duration={3000}>
          Date updated successfully!
        </Snackbar>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginTop: 15,
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
});
