import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ActivityIndicator, Card, Divider, Paragraph, Title } from 'react-native-paper';
import { db } from '../../firebaseConfig';

export default function ViewStatsList() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'tirumala_daily_stats'));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setStats(data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>📅 Tirumala Daily Stats</Title>

      {loading ? (
        <ActivityIndicator animating={true} size="large" />
      ) : (
        stats.map((item) => (
          <Card key={item.id} style={styles.card}>
            <Card.Content>
              <Title>{new Date(item.date.seconds * 1000).toDateString()}</Title>
              <Paragraph>Pilgrims: {item.pilgrims}</Paragraph>
              <Paragraph>Tonsures: {item.tonsures}</Paragraph>
              <Paragraph>Hundi Kanukalu: ₹{item.hundi_kanukalu} Cr</Paragraph>
              <Paragraph>Compartments: {item.waiting_compartments}</Paragraph>
              <Paragraph>Darshan Time: {item.darshan_time_hours} hrs</Paragraph>
              <Paragraph>Has SSD Token: {item.has_ssd_token ? 'without ssd tokens ' : 'with ssd tokens'}</Paragraph>
            </Card.Content>
            <Divider />
          </Card>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f4f4f4',
    flexGrow: 1
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#fff',
    elevation: 2,
    borderRadius: 8
  }
});
