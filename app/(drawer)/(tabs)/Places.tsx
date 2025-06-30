import { useFocusEffect, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, FlatList, Image, Pressable, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

const places = [
  {
    id: 'tirumala',
    name: 'Tirumala Temple',
    image: require('@/assets/images/darshan-ticket.png'),
    short: 'Famous Venkateswara temple on the hill.',
    description: 'Tirumala Venkateswara Temple is one of the most visited pilgrimage centers in the world, located on the Tirumala hills.',
  },
  {
    id: 'kapila',
    name: 'Kapila Theertham',
    image: require('@/assets/images/senior-citizen.png'),
    short: 'Ancient Shiva temple with waterfall.',
    description: 'Kapila Theertham is a sacred temple dedicated to Lord Shiva, located at the foot of the Tirumala hills, with a beautiful waterfall.',
  },
  {
    id: 'sriVari',
    name: 'Sri Vari Museum',
    image: require('@/assets/images/home-bg.png'),
    short: 'Museum of temple history and artifacts.',
    description: 'Sri Vari Museum displays the history, architecture, and artifacts of the Tirumala temple.',
  },
];

const numColumns = 2;
const screenWidth = Dimensions.get('window').width;
const imageSize = screenWidth / numColumns - 32;

function PlaceCard({ item, index, onPress }: { item: typeof places[0]; index: number; onPress: () => void }) {
  const anim = useSharedValue(0);
  useFocusEffect(
    React.useCallback(() => {
      anim.value = 0;
      anim.value = withDelay(index * 120, withTiming(1, { duration: 1000 }));
    }, [anim, index])
  );
  const style = useAnimatedStyle(() => ({
    opacity: anim.value,
    transform: [{ scale: 0.85 + 0.15 * anim.value }, { rotate: `${(1 - anim.value) * 9}deg` }],
  }));
  return (
    <Animated.View style={[{ flex: 1, maxWidth: index % numColumns === 0 && index === places.length - 1 ? imageSize : undefined }, style]}>
      <Pressable onPress={onPress} style={{ flex: 1 }}>
        <Card style={{ borderRadius: 16, overflow: 'hidden', elevation: 0 }}>
          <Image
            source={item.image}
            style={{ width: imageSize, height: imageSize * 1.1, resizeMode: 'cover' }}
          />
          <Card.Content>
            <Text variant="titleMedium" style={{ marginTop: 8 }}>
              {item.name}
            </Text>
            <Text variant="bodySmall" style={{ color: '#888', marginTop: 2 }}>
              {item.short}
            </Text>
          </Card.Content>
        </Card>
      </Pressable>
    </Animated.View>
  );
}

export default function Places() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <Text variant="titleLarge" style={{ textAlign: 'center', marginVertical: 16 }}>
        Explore Places
      </Text>
      <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        columnWrapperStyle={{ gap: 12 }}
        renderItem={({ item, index }) => (
          <PlaceCard
            item={item}
            index={index}
            onPress={() => router.push({ pathname: '/places/[placeId]', params: { placeId: item.id } })}
          />
        )}
      />
    </View>
  );
}