import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: 'white', 
        headerStyle: {
          backgroundColor: '#007EE3',
        },
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: 'black',
        drawerActiveBackgroundColor: '#007EE3',
      }}
    />
  );
}
