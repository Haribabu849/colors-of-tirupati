import { useState } from 'react';
import { FlatList, View } from 'react-native';
import { Button, Card, IconButton, Text } from 'react-native-paper';

const ringtones = [
  { id: '1', name: 'Temple Bells', duration: '0:30' },
  { id: '2', name: 'Morning Aarti', duration: '0:45' },
  { id: '3', name: 'Chanting OM', duration: '0:20' },
  { id: '4', name: 'Peaceful Flute', duration: '0:35' },
];

export default function Ringtones() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handlePlay = (id: string) => {
    setPlayingId(id === playingId ? null : id);
    // TODO: Integrate actual audio playback logic here
  };

  const handleSetRingtone = (id: string) => {
    // TODO: Integrate set as ringtone logic for Android
    alert('Set as ringtone: ' + id);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <Text variant="titleLarge" style={{ textAlign: 'center', marginVertical: 16 }}>Ringtones</Text>
      <FlatList
        data={ringtones}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        renderItem={({ item }) => (
          <Card style={{ borderRadius: 12 }}>
            <Card.Content style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <IconButton
                  icon={playingId === item.id ? 'stop' : 'play'}
                  onPress={() => handlePlay(item.id)}
                  size={28}
                  style={{ marginRight: 8 }}
                />
                <View>
                  <Text variant="titleMedium">{item.name}</Text>
                  <Text variant="bodySmall" style={{ color: '#888' }}>{item.duration}</Text>
                </View>
              </View>
              <Button mode="outlined" onPress={() => handleSetRingtone(item.id)}>
                Set as Ringtone
              </Button>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}