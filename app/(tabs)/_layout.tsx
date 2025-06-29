import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';


import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007EE3",
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
        tabBarPressColor: 'transparent', // disables ripple on Android
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="temple-hindu" color={color} />,
        }}
      />
      <Tabs.Screen
        name="ringtones"
        options={{
          title: 'ringtones',
          tabBarIcon: ({ color,focused }) => <Ionicons name={focused ?"musical-notes":"musical-notes-outline"} color={color} size={24} />,
        }}
      />
            <Tabs.Screen
        name="wallpapers"
        options={{
          title: 'wallpapers',
          tabBarIcon: ({ color,focused }) => <Ionicons name={focused ? "images":"images-outline"} color={color} size={24} />,
        }}
      />
              <Tabs.Screen
        name="guide"
        options={{
          title: 'guide',
          tabBarIcon: ({ color }) => <Fontisto name="direction-sign" color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
