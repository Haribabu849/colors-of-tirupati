import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function ExternalWebViewer() {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://ttdevasthanams.ap.gov.in/spat/slot-booking?flow=spat&flowIdentifier=spat' }} // 🔁 Replace with your desired link
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
