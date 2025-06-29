import * as React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function Ringtones() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text variant="titleLarge">ringtones</Text>
      <Button mode="contained" onPress={() => console.log('Button pressed!')} style={{ marginTop: 16 }}>
        Press me
      </Button>
    </View>
  );
}