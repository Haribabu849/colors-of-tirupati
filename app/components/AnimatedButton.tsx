import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

interface Props {
  onPress?: () => void;
  label?: string;
}

const MAGIC_GRADIENT = ["#77e8ff", "#007EE3", "#B24592", "#F15F79"];

const BookNowButton: React.FC<Props> = ({
  onPress = () => console.log("BOOK NOW pressed"),
  label = "BOOK NOW",
}) => {
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.07, { duration: 600 }),
        withTiming(1, { duration: 600 })
      ),
      -1,
      true
    );
    rotate.value = withRepeat(
      withSequence(
        withTiming(2, { duration: 600 }),
        withTiming(-2, { duration: 600 }),
        withTiming(0, { duration: 600 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotate.value}deg` }],
  }));

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    onPress();
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={24} tint="light" style={styles.blurShadow} />
      <Animated.View style={[styles.animatedWrap, animatedStyle]}>
        <AnimatedLinearGradient
          colors={MAGIC_GRADIENT}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <Button
            mode="contained"
            onPress={handlePress}
            style={styles.button}
            labelStyle={styles.label}
            contentStyle={styles.content}
          >
            <Text style={styles.label}>{label}</Text>
          </Button>
        </AnimatedLinearGradient>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 12, // reduced margin
    minHeight: 54, // reduced minHeight
    justifyContent: "center",
  },
  blurShadow: {
    position: "absolute",
    left: "20%",
    right: "20%",
    bottom: 8,
    height: 24, // reduced height
    borderRadius: 24, // reduced radius
    opacity: 0.38,
    zIndex: 0,
  },
  animatedWrap: {
    borderRadius: 24, // reduced radius
    overflow: "visible",
  },
  gradient: {
    borderRadius: 24, // reduced radius
    padding: 2, // reduced padding
    ...Platform.select({
      ios: {
        shadowColor: "#62eafc",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.54,
        shadowRadius: 10,
      },
      android: {
        elevation: 12,
      },
    }),
    minWidth: 120, // reduced width
  },
  button: {
    backgroundColor: "transparent",
    borderRadius: 20, // reduced radius
    elevation: 0,
    minHeight: 38, // reduced height
    justifyContent: "center", // ensure vertical centering
    alignItems: "center", // ensure horizontal centering
    flexDirection: "row", // icon and label in a row
  },
  content: {
    flexDirection: "row",
    alignItems: "center", // vertical centering of icon and label
    paddingVertical: 6, // reduced padding
    paddingHorizontal: 18, // reduced padding
    justifyContent: "center",
  },
  label: {
    fontSize: 13, // reduced font size
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    textShadowColor: "#70f8fb",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  icon: {
    marginRight: 8, // reduced margin
    textShadowColor: "#70f8fb",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
});

export default BookNowButton;
