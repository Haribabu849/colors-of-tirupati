import { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, View } from "react-native";
import { Card, Text } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLocalSearchParams } from "expo-router";
import AnimatedButton from "../components/AnimatedButton";
import { useCountdown } from "../lib/UseCountdown";
const width = Dimensions.get("window").width * 0.85;

const images = [
  require("@/assets/images/darshan-ticket.png"),
  require("@/assets/images/senior-citizen.png"),
  // add more images as needed
];

export default function MyCarousel() {
  const { facility } = useLocalSearchParams();
  const targetDate = new Date("2025-08-01T12:00:00"); // Or from props

  const { days, hours, minutes, seconds } = useCountdown(targetDate);
  console.log("Facility:", facility, days, hours, minutes, seconds);
  // Animation setup for cards
  const leftCardTranslate = useSharedValue(-300);
  const rightCardTranslate = useSharedValue(300);
  // Animation setup for BOOK NOW button
  const bookNowScale = useSharedValue(1);

  useEffect(() => {
    leftCardTranslate.value = withTiming(0, { duration: 1500 });
    rightCardTranslate.value = withTiming(0, { duration: 1500 });
    bookNowScale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 600 }),
        withTiming(1, { duration: 600 })
      ),
      -1,
      true
    );
  }, []);

  const leftCardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: leftCardTranslate.value }],
    opacity: leftCardTranslate.value === 0 ? 1 : 0.7,
  }));
  const rightCardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: rightCardTranslate.value }],
    opacity: rightCardTranslate.value === 0 ? 1 : 0.7,
  }));
  const bookNowButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bookNowScale.value }],
  }));

  // Countdown progress bar setup
  const totalDays = 10; // Example: total countdown days
  const [daysLeft, setDaysLeft] = useState(7); // Example: days left
  const progress = useSharedValue((totalDays - daysLeft) / totalDays);

  // Animate progress bar when daysLeft changes
  useEffect(() => {
    progress.value = withTiming((totalDays - daysLeft) / totalDays, {
      duration: 1000,
    });
  }, [daysLeft, totalDays, progress]);

  const progressValue = progress.value; // for passing to child components

  const progressBarStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingBottom: 24,
        marginTop: 10,
      }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Add heading here */}
        <Text
          variant="titleLarge"
          style={{
            textAlign: "center",
            marginTop: 16,
            marginBottom: 4,
            fontWeight: "bold",
            color: "#007EE3",
            letterSpacing: 1,
            fontSize: 16,
            borderColor: "pink",
            borderWidth: 1,
            padding: 8,
            width: "80%",
            marginHorizontal: "auto",
            borderRadius: 12,
          }}
        >
          Special Darshan Tickets - 300rs
        </Text>
        <View
          style={{
            height: 200,
            margin: "auto",
            marginVertical: 16,
            position: "relative",
          }}
        >
          <Carousel
            width={width}
            height={200}
            data={images}
            renderItem={({ item }) => (
              <Image
                source={item}
                style={{ width: "100%", height: 200, borderRadius: 12 }}
                resizeMode="cover"
              />
            )}
            autoPlay
            autoPlayInterval={1500}
            loop
          />
        </View>
        <View style={{ gap: 16, marginHorizontal: 16, marginTop: 32 }}>
          {/* <LargeCircularBar progress={progressValue} daysLeft={daysLeft} /> */}
          {/* Countdown progress bar and related animation removed as requested */}
          <AnimatedButton />
          <Animated.View style={leftCardStyle}>
            <Card
              style={{
                backgroundColor: "#fff",
                borderRadius: 12,
                elevation: 0,
                shadowColor: "transparent",
              }}
            >
              <Card.Content>
                <Text
                  variant="titleMedium"
                  style={{
                    fontWeight: "bold",
                    marginBottom: 4,
                    color: "#007EE3",
                    textAlign: "center",
                  }}
                >
                  This is Header {days} {hours} {minutes} {seconds}
                </Text>
                <Text style={{ textAlign: "justify" }}>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Nobis nesciunt assumenda est. Nesciunt obcaecati distinctio
                  expedita, nemo quis aliquid! Architecto alias voluptatem nobis
                  inventore est maxime soluta eveniet dolor accusamus?
                </Text>
              </Card.Content>
            </Card>
          </Animated.View>
          <Animated.View style={rightCardStyle}>
            <Card
              style={{
                backgroundColor: "#fff",
                borderRadius: 12,
                elevation: 0,
                shadowColor: "transparent",
              }}
            >
              <Card.Content>
                <Text
                  variant="titleMedium"
                  style={{
                    fontWeight: "bold",
                    marginBottom: 4,
                    color: "#007EE3",
                    textAlign: "center",
                  }}
                >
                  Do&apos;s and Don&apos;ts
                </Text>
                <Text style={{ textAlign: "justify" }}>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Nemo, soluta culpa! Obcaecati laudantium in neque a deserunt
                  molestiae voluptas veritatis sequi dolores quia fugiat
                  temporibus sit, facilis explicabo, eius repellat!
                </Text>
              </Card.Content>
            </Card>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
