import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DefaultTheme, ThemeProvider, useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
// import PlacesScreen from './places'; // Adjust the import based on your file structure
import AboutScreen from './screens/UploadDarshanDate'; // Adjust the import based on your file structure
import SettingsScreen from './screens/UploadNewsForm'; // Adjust the import based on your file structure

const Drawer = createDrawerNavigator();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
      <ThemeProvider value={DefaultTheme}>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" options={{ headerShown: false }}>
            {() => (
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
            )}
          </Drawer.Screen>
          <Drawer.Screen name="About" options={{ title: 'About' }}>
            {() => <AboutScreen />}
          </Drawer.Screen>
          <Drawer.Screen name="Settings" options={{ title: 'Settings' }}>
            {() => <SettingsScreen />}
            
          {/* </Drawer.Screen>
                   <Drawer.Screen name="places" options={{ title: 'Places' }}>
            {() => <PlacesScreen />} */}
            
          </Drawer.Screen>
          {/* Add more screens as needed */}
        </Drawer.Navigator>
        <StatusBar style="auto" />
      </ThemeProvider>
  );
}

export function TabLayout() {
  const navigation = useNavigation();

  return (
      <Tabs
        screenOptions={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 16 }}>
              <Ionicons name="menu" size={24} color="black" />
            </TouchableOpacity>
          ),
          // ...other options
        }}
      >
        {/* ...your tab screens... */}
      </Tabs>
  );
}

export function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1,backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 56 }} showsVerticalScrollIndicator={false}>
        {/* ...all your content... */}
      </ScrollView>
    </SafeAreaView>
  );
}
