import React from "react";
import {
  Animated, // for handling entire component click
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native-paper";

type ImageWithLabelProps = {
  source: any;
  label: string;
  onPress?: () => void;
};

const ImageWithLabel: React.FC<ImageWithLabelProps> = ({
  source,
  label,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.wrapper}>
      <View style={styles.container}>
        <Animated.Image
          source={source}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "32%",
    marginBottom: 16,
    overflow: "hidden",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  label: {
    textAlign: "center",
    fontSize: 10,
    marginTop: 6,
  },
});

export default ImageWithLabel;
