import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const places = {
  tirumala: {
    name: 'Tirumala Temple',
    image: require('@/assets/images/darshan-ticket.png'),
    description: 'Tirumala Venkateswara Temple is one of the most visited pilgrimage centers in the world, located on the Tirumala hills. The temple is dedicated to Lord Venkateswara, an incarnation of Vishnu, and is renowned for its Dravidian architecture and spiritual significance.'
  },
  kapila: {
    name: 'Kapila Theertham',
    image: require('@/assets/images/senior-citizen.png'),
    description: 'Kapila Theertham is a sacred temple dedicated to Lord Shiva, located at the foot of the Tirumala hills, with a beautiful waterfall. It is a tranquil spot for devotees and nature lovers alike.'
  },
  sriVari: {
    name: 'Sri Vari Museum',
    image: require('@/assets/images/home-bg.png'),
    description: 'Sri Vari Museum displays the history, architecture, and artifacts of the Tirumala temple. It offers a fascinating insight into the temple’s rich heritage.'
  },
};

export default function PlaceDetails() {
  const { placeId } = useLocalSearchParams();
  const place = places[placeId as keyof typeof places];

  // Animation: fade in and slide up
  const cardOpacity = useSharedValue(0);
  const cardTranslate = useSharedValue(40);

  useEffect(() => {
    cardOpacity.value = withTiming(1, { duration: 700 });
    cardTranslate.value = withTiming(0, { duration: 700 });
  }, []);

  const cardAnimStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardTranslate.value }],
  }));

  if (!place) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text variant="titleLarge">Place not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', paddingBottom:24,marginTop:10 }}>
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ padding: 24, alignItems: 'center' }} showsVerticalScrollIndicator={false}>
        <Animated.View style={[{ width: '100%' }, cardAnimStyle]}>
          <Card style={{ borderRadius: 20, width: '100%', marginBottom: 24, overflow: 'hidden', elevation: 4 }}>
            <Image source={place.image} style={{ width: '100%', height: 220, borderTopLeftRadius: 20, borderTopRightRadius: 20, resizeMode: 'cover' }} />
            <Card.Content>
              <Text variant="titleLarge" style={{ marginTop: 16, textAlign: 'center' }}>{place.name}</Text>
              <Text variant="bodyMedium" style={{ marginTop: 12, textAlign: 'center', color: '#555' }}>{place.description}</Text>
            </Card.Content>
          </Card>
        </Animated.View>
        <Animated.View style={[{ width: 200 }, cardAnimStyle]}>
          <Button mode="contained" onPress={() => {}} style={{ width: 200 }}>
            Plan Visit
          </Button>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
