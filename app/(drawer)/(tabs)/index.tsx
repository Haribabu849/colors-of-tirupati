import Cards from "@/app/components/Cards";
import ImageWithLabel from "@/app/components/ImageWithLabel";
import SectionWithGrid from "@/app/components/SectionWithGrid";
import { router } from "expo-router";
import * as React from "react";
import { useEffect, useRef } from "react";
import { Animated, ScrollView, StyleSheet, View } from "react-native";

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

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // Reusable ImageWithLabel component

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
        <Cards />
        {/* Render all sections dynamically */}
        {sections.map((section, idx) => (
          <SectionWithGrid
            key={section.title}
            title={section.title}
            items={section.items}
            images={images}
            onViewMore={() => router.push(section.route)}
            ImageWithLabel={ImageWithLabel}
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
    shadowColor: "gray",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
});
