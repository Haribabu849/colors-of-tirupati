import SomeComponent from "@/app/components/SomeComponent";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import * as React from "react";
import { useEffect, useRef } from "react";
import { Animated, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import EvilIcons from "react-native-vector-icons/EvilIcons";

// Fix: add index signature for images object
type ImagesMap = { [key: string]: any };
const images: ImagesMap = {
  "darshan-ticket.png": require("@/assets/images/special-darshan.png"),
  "senior-citizen.png": require("@/assets/images/senior-citizen.png"),
  "ssd-token.png": require("@/assets/images/ssd-token.png"),
  "electronic-hundi.png": require("@/assets/images/electronic-hundi.png"),
  "sapthagiri-magazine.png": require("@/assets/images/sapthagiri-magazine.png"),
  "kalyana-mandapam.png": require("@/assets/images/kalyana-mandapam.png"),
  "angapradakshanam.png": require("@/assets/images/angapradakshanam.png"),
  "arjitha-seva.png": require("@/assets/images/arjitha-seva.png"),
  "virtual-seva.png": require("@/assets/images/virtual-seva.png"),
  "calendar.png": require("@/assets/images/calendar.png"),
  // add all your images here
};

let images1 = [
  {
    path: "calendar.png",
    name: "Special Darshan - 300rs",
    route: "/special-darshan",
  },
  {
    path: "senior-citizen.png",
    name: "Senior Citizen",
    route: "/senior-citizen",
  },
  {
    path: "ssd-token.png",
    name: "Special Darshan Tiruchanur",
    route: "/ssd-tiruchanur",
  },
  { path: "arjitha-seva.png", name: "Arjitha Seva", route: "/arjitha-seva" },
  { path: "virtual-seva.png", name: "Virtual Seva", route: "/virtual-seva" },
  {
    path: "kalyana-mandapam.png",
    name: "Special Darshan Tiruchanur",
    route: "/kalyana-mandapam",
  },
];

const sections = [
  {
    title: "Types of Darshans",
    items: images1.slice(0, 3),
    route: "/darshans",
  },
  {
    title: "Types of Sevas",
    items: images1.slice(0, 6),
    route: "/sevas",
  },
  {
    title: "Accomodation",
    items: images1.slice(0, 2),
    route: "/accomodation",
  },
  {
    title: "Places",
    items: images1.slice(0, 3),
    route: "/places",
  },
  {
    title: "Hundi",
    items: images1.slice(0, 2),
    route: "/hundi",
  },
];

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  // const router = useRouter();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // Reusable ImageWithLabel component
  function ImageWithLabel({
    source,
    label,
    onPress,
  }: {
    source: any;
    label: string;
    onPress?: () => void;
  }) {
    return (
      <View style={{ width: "32%", alignItems: "center", marginBottom: 16 }}>
        <Animated.View style={{ width: 60, height: 60 }}>
          <Button
            onPress={onPress}
            style={{
              padding: 0,
              minWidth: 0,
              minHeight: 0,
              borderRadius: 8,
              overflow: "hidden",
            }}
            contentStyle={{
              width: 60,
              height: 60,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Animated.Image
              source={source}
              style={{
                width: 60,
                height: 60,
                borderRadius: 8,
                marginBottom: 0,
              }}
              resizeMode="cover"
            />
          </Button>
        </Animated.View>
        <Text style={{ textAlign: "center", fontSize: 10 }}>{label}</Text>
      </View>
    );
  }

  // Reusable SectionWithGrid component
  function SectionWithGrid({
    title,
    items,
    images,
    onViewMore,
  }: {
    title: string;
    items: { path: string; name: string }[];
    images: ImagesMap;
    onViewMore?: () => void;
  }) {
    // Helper to split array into chunks of 3
    function chunkArray(array: any[], size: number) {
      const result = [];
      for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
      }
      return result;
    }
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 16,
          }}
        >
          <LinearGradient
            colors={["#3FADFB", "#007EE3"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              padding: 16,
              borderRadius: 8,
              width: "60%",
              borderColor: "black",
              borderWidth: 0.8,
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                textTransform: "uppercase",
                fontWeight: "500",
                letterSpacing: 1.1,
                fontSize: 10,
              }}
            >
              {title}
            </Text>
          </LinearGradient>
          <Button
            mode="text"
            onPress={onViewMore}
            contentStyle={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
            style={{ marginLeft: 8 }}
            labelStyle={{ fontSize: 10, textAlign: "center" }}
          >
            <Text style={{ fontSize: 10 }}>View More</Text>
            <EvilIcons
              name="arrow-right"
              color="#000"
              size={12}
              style={{ marginLeft: 4 }}
            />
          </Button>
        </View>
        {chunkArray(items, 3).map((row, rowIdx) => (
          <View
            key={rowIdx}
            style={{
              flexDirection: "row",
              justifyContent: row.length === 3 ? "space-between" : "flex-start",
              width: "100%",
              marginTop: rowIdx === 0 ? 16 : 0,
              marginBottom: 10,
            }}
          >
            {row.map((item, idx) => (
              <ImageWithLabel
                key={idx}
                source={images[item.path]}
                label={item.name}
                onPress={item.route ? () => router.push(item.route) : undefined}
              />
            ))}
          </View>
        ))}
      </>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 0 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Animated.Image
          source={require("@/assets/images/home-bg.png")}
          style={[styles.image, { opacity: fadeAnim }]}
        />
        <SomeComponent />

        {/* Render all sections dynamically */}
        {sections.map((section, idx) => (
          <SectionWithGrid
            key={section.title}
            title={section.title}
            items={section.items}
            images={images}
            onViewMore={() => router.push(section.route)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "white",
    paddingBottom: 10,
  },
  title: {
    color: "red",
  },
  button: {
    marginTop: 16,
    width: 20,
    // boxShadow is not supported in React Native, consider using elevation for Android or shadow props for iOS
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 250,
    marginVertical: 16,
    borderRadius: 4,
    alignSelf: "center",
    borderWidth: 0.5,
    borderColor: "purple",
    borderStyle: "dotted",
    // boxShadow is not supported in React Native
    // For shadow on iOS:
    shadowColor: "gray",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    // For elevation on Android:
    elevation: 8,
  },
});
