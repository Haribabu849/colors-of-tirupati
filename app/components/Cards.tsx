import EvilIcons from "@expo/vector-icons/EvilIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

function AnimatedCard({ iconName, label, onPress, shimmerAnim, pulseAnim }) {
  const shimmerTranslate = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  const leftIconAnim = useRef(new Animated.Value(0)).current;
  const rightIconAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Left icon fade-in
    Animated.timing(leftIconAnim, {
      toValue: 1,
      duration: 1000,
      delay: 200,
      useNativeDriver: true,
    }).start();

    // Right icon pulse (looping)
    Animated.loop(
      Animated.sequence([
        Animated.timing(rightIconAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(rightIconAnim, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ scale: pulseAnim }],
          },
        ]}
      >
        {/* Shimmer Effect */}
        <View style={styles.shimmerWrapper}>
          <Animated.View
            style={[
              styles.shimmerOverlay,
              {
                transform: [{ translateX: shimmerTranslate }],
              },
            ]}
          >
            <LinearGradient
              colors={["transparent", "rgba(255,255,255,0.25)", "transparent"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.shimmerGradient}
            />
          </Animated.View>
        </View>

        <Card.Content style={styles.cardContent}>
          <Animated.View style={{ opacity: leftIconAnim }}>
            <EvilIcons name={iconName} size={28} color="#fff" />
          </Animated.View>

          <Text style={styles.cardText}>{label}</Text>

          <Animated.View
            style={{
              opacity: rightIconAnim,
              transform: [
                {
                  scale: rightIconAnim.interpolate({
                    inputRange: [0.7, 1],
                    outputRange: [0.95, 1.1],
                  }),
                },
              ],
            }}
          >
            <EvilIcons name="chevron-right" size={28} color="#fff" />
          </Animated.View>
        </Card.Content>
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function SomeComponent() {
  const router = useRouter();
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 2200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.04,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <AnimatedCard
          iconName="bell"
          label="Latest News"
          shimmerAnim={shimmerAnim}
          pulseAnim={pulseAnim}
          onPress={() => router.push("/screens/LiveUpdates")}
        />
        <AnimatedCard
          iconName="calendar"
          label="SSD Tokens"
          shimmerAnim={shimmerAnim}
          pulseAnim={pulseAnim}
          onPress={() => router.push("/screens/SlottedSarvaDarshan")}
        />
        <AnimatedCard
          iconName="clock"
          label="Today's Schedules"
          shimmerAnim={shimmerAnim}
          pulseAnim={pulseAnim}
          onPress={() => router.push("/screens/TodaysSchedules")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "column",
    gap: 12,
  },
  card: {
    width: "100%",
    marginBottom: 0,
    elevation: 4,
    borderRadius: 12,
    alignSelf: "center",
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: "#007EE3",
    overflow: "hidden",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // space between icons and text
  },
  cardText: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
  },
  shimmerWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  shimmerOverlay: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  shimmerGradient: {
    width: 100,
    height: "100%",
  },
});
