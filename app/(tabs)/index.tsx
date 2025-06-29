import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <SafeAreaView style={styles.container} >
        <ScrollView contentContainerStyle={{ paddingBottom: 56 }}showsVerticalScrollIndicator={false}>
      <Text variant="titleLarge" style={styles.title}>Home Page</Text>

      

      
      <Animated.Image
        source={require('@/assets/images/home-bg.png')}
        style={[styles.image, { opacity: fadeAnim }]}
      />
<LinearGradient
  colors={['#3FADFB',"#007EE3"]} start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 0 }}
  style={{ padding: 16, borderRadius: 8,width:"60%", margin:"auto", marginTop: 16,borderColor:"black",borderWidth:0.8, }}
>
  <Text style={{ color: 'white' ,textAlign:"center",textTransform:"uppercase",fontWeight:500, letterSpacing:1.1}}>Types of Darshans</Text>
</LinearGradient>
<View style={{display:"flex",justifyContent:"space-between",width:"100%",flexDirection:"row",flexWrap:"wrap",marginTop:16,rowGap:10}}>


<Avatar.Text size={80} label="darshan" style={{flexBasis:"45%",backgroundColor:"#007EE3"}} />
<Avatar.Text size={80} label="XD" style={{flexBasis:"45%",backgroundColor:"#007EE3"}} />
<Avatar.Text size={80} label="XD"  style={{flexBasis:"45%",backgroundColor:"#007EE3"}}/>
</View>

<LinearGradient
   colors={['#FF9A00',"#FCBD34"]} start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 0 }}
  style={{ padding: 16, borderRadius: 8,width:"50%", margin:"auto", marginTop: 16,borderColor:"black",borderWidth:0.8 }}
>
  <Text style={{ color: 'black' ,textAlign:"center",textTransform:"uppercase"}}>Types of Sevas</Text>
</LinearGradient>
<View style={{display:"flex",justifyContent:"space-between",width:"100%",flexDirection:"row",flexWrap:"wrap",marginTop:16,rowGap:10}}>


<Avatar.Text size={80} label="XD" style={{flexBasis:"45%"}} />
<Avatar.Text size={80} label="XD" style={{flexBasis:"45%"}} />
<Avatar.Text size={80} label="XD"  style={{flexBasis:"45%"}}/>
<Avatar.Text size={80} label="XD"  style={{flexBasis:"45%"}}/>
</View>
<View style={{display:"flex",justifyContent:"space-between",width:"100%",flexDirection:"row",flexWrap:"wrap",marginTop:16,rowGap:10}}>


<Avatar.Text size={80} label="XD" style={{flexBasis:"45%"}} />
<Avatar.Text size={80} label="XD" style={{flexBasis:"45%"}} />
<Avatar.Text size={80} label="XD"  style={{flexBasis:"45%"}}/>
<Avatar.Text size={80} label="XD"  style={{flexBasis:"45%"}}/>
</View>
</ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight:16,
    backgroundColor:"white",
    paddingBottom:0
  },
  title: {
    color: 'red',
  },
  button: {
    marginTop: 16,
    width: 20,
    // boxShadow is not supported in React Native, consider using elevation for Android or shadow props for iOS
    elevation:4
  },
  image: {
    width: '100%',
    height: 250,
    marginVertical: 16,
    borderRadius: 4,
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: 'purple',
    borderStyle: 'dotted',
    // boxShadow is not supported in React Native
    // For shadow on iOS:
    shadowColor: 'gray',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    // For elevation on Android:
    elevation: 8,
  }
});