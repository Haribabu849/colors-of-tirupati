import React from "react";
import { StyleSheet, Text, View } from "react-native";

const LiveUpdates = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is live updates route</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
    color: "#222",
  },
});

export default LiveUpdates;
