import { DefaultTheme } from 'react-native-paper';



const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#007EE3',      // Your primary color
    accent: '#3FADFB',       // Your accent color
    background: '#fff',      // Background color
    surface: '#fff',         // Surface color
    text: '#000',            // Text color
    // Add or override more colors as needed
  },
};

export const PaperTheme = theme;
