import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Button, Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UploadToCloudinary() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Please allow media access to continue.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1], // for square crop, or [width, height] for custom
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const asset = result.assets[0];
      uploadImage(asset.uri);
    }
  };

  const uploadImage = async (imageUri) => {
    setUploading(true);

    const data = new FormData();
    data.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'upload.jpg',
    });

    data.append('upload_preset', 'tirumala_upload'); // ✅ Your unsigned preset

    // Optional: to upload inside tirumala/phots folder
    // data.append('public_id', 'tirumala/phots/upload_' + Date.now());

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dwqvcuajl/image/upload', {
        method: 'POST',
        body: data,
      });
      const json = await res.json();
      console.log('Cloudinary response:', json); // ✅ Log everything

      if (json.secure_url) {
        setImage(json.secure_url);
        Alert.alert('Upload Success 🎉', 'Image uploaded successfully!');
      } else {
        const errorMsg = json.error?.message || 'Upload failed';
        Alert.alert('Upload failed', errorMsg);
      }
    } catch (err) {
      console.error('Upload error:', err);
      Alert.alert('Upload error', err.message || 'Something went wrong.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick an Image and Upload" onPress={pickImage} />
        {uploading && <ActivityIndicator size="large" color="blue" style={{ marginTop: 20 }} />}
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 300, height: 300, marginTop: 20, borderRadius: 10 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
