import { useFocusEffect } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, FlatList, Image, Modal, Pressable, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';


const wallpapers = [
  require('@/assets/images/home-bg.png'),
  require('@/assets/images/darshan-ticket.png'),
  require('@/assets/images/senior-citizen.png'),
];

const numColumns = 2;
const screenWidth = Dimensions.get('window').width;
const imageSize = screenWidth / numColumns - 32;

function WallpaperCard({ item, index, isLast, onPress }: { item: any; index: number; isLast: boolean; onPress: () => void }) {
  const anim = useSharedValue(0);
  useFocusEffect(
    React.useCallback(() => {
      anim.value = 0;
      anim.value = withDelay(index * 120, withTiming(1, { duration: 1200 }));
    }, [anim, index])
  );
  const animStyle = useAnimatedStyle(() => ({
    opacity: anim.value,
    transform: [
      { scale: 0.7 + 0.3 * anim.value },
      { rotateY: `${(1 - anim.value) * 200}deg` },
    ],
  }));
  return (
    <Animated.View style={[{ flex: 1, maxWidth: isLast ? imageSize : undefined }, animStyle]}>
      <Pressable onPress={onPress} style={{ flex: 1 }}>
        <Card style={{ borderRadius: 16, overflow: 'hidden', elevation: 3 }}>
          <Image source={item} style={{ width: imageSize, height: imageSize * 1.4, resizeMode: 'cover' }} />
        </Card>
      </Pressable>
    </Animated.View>
  );
}

export default function Wallpapers() {
  const [preview, setPreview] = useState<number | null>(null);

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <Text variant="titleLarge" style={{ textAlign: 'center', marginVertical: 16 }}>Wallpapers</Text>
      <FlatList
        data={wallpapers}
        keyExtractor={(_, idx) => idx.toString()}
        numColumns={numColumns}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        columnWrapperStyle={{ gap: 12 }}
        renderItem={({ item, index }) => {
          const isLast = index === wallpapers.length - 1 && wallpapers.length % numColumns !== 0;
          return (
            <WallpaperCard
              item={item}
              index={index}
              isLast={isLast}
              onPress={() => setPreview(index)}
            />
          );
        }}
      />
      <Modal
        visible={preview !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setPreview(null)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center' }}>
          {typeof preview === 'number' && wallpapers[preview] && (
            <Card style={{ borderRadius: 20, padding: 16, alignItems: 'center', width: screenWidth * 0.85 }}>
              <Image source={wallpapers[preview]} style={{ width: '100%', height: 320, borderRadius: 16, marginBottom: 16, resizeMode: 'cover' }} />
              <Button mode="contained" onPress={() => alert('Set as wallpaper!')}>Set as Wallpaper</Button>
              <Button mode="text" onPress={() => setPreview(null)} style={{ marginTop: 8 }}>Close</Button>
            </Card>
          )}
        </View>
      </Modal>
    </View>
  );
}