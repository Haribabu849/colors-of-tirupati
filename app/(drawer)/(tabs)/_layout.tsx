import { Tabs } from 'expo-router/tabs';
import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export const unstable_settings = {
  drawerLabel: 'Home',
  title: 'Home',
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007EE3",
        tabBarInactiveTintColor: "black", // Set inactive tab icon/text color to black
        headerShown: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#007EE3', // Replace with your desired color
        },
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          android: {
            backgroundColor: 'white', // Set your desired color for Android
          },
          default: {},
        }),
        tabBarButton: (props) => (
          <TouchableOpacity
            activeOpacity={1}
            // Remove android_ripple and only pass supported props
            onPress={props.onPress}
            onLongPress={props.onLongPress ?? undefined}
            style={props.style}
            accessibilityRole={props.accessibilityRole}
            accessibilityState={props.accessibilityState}
            accessibilityLabel={props.accessibilityLabel}
            testID={props.testID}
          >
            {props.children}
          </TouchableOpacity>
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'HOME',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="temple-hindu" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Ringtones"
        options={{
          title: 'Ringtones',
          tabBarIcon: ({ color,focused }) => <Ionicons name={focused ?"musical-notes":"musical-notes-outline"} color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="Places"
        options={{
          title: 'Places',
          tabBarIcon: ({ color }) => <Entypo name="location" color={color} size={24} />,
        }}
      />
      
      <Tabs.Screen
        name="Wallpapers"
        options={{
          title: 'Wallpapers',
          tabBarIcon: ({ color,focused }) => <Ionicons name={focused ? "images":"images-outline"} color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
