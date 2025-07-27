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
  { path: "calendar.png", name: "Special Darshan - 300rs" },
  { path: "senior-citizen.png", name: "Senior Citizen" },
  { path: "ssd-token.png", name: "Special Darshan Tiruchanur" },

  // { path: "electronic-hundi.png", name: "Senior Citizen" },
  // { path: "angapradakshanam.png", name: "Special Darshan Tiruchanur" },
  // { path: "sapthagiri-magazine.png", name: "Special Darshan Tiruchanur" },
  { path: "arjitha-seva.png", name: "Arjitha Seva" },
  { path: "virtual-seva.png", name: "Virtual Seva" },
  { path: "kalyana-mandapam.png", name: "Special Darshan Tiruchanur" },
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
  function ImageWithLabel({ source, label }: { source: any; label: string }) {
    return (
      <View style={{ width: "32%", alignItems: "center", marginBottom: 16 }}>
        <Animated.Image
          source={source}
          style={{ width: 60, height: 60, borderRadius: 8, marginBottom: 8 }}
          resizeMode="cover"
        />
        <Text style={{ textAlign: "center" }}>{label}</Text>
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
            labelStyle={{ fontSize: 16, textAlign: "center" }}
          >
            <Text style={{ fontSize: 16 }}>View More</Text>
            <EvilIcons
              name="arrow-right"
              color="#000"
              size={22}
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 16,
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <Button
            mode="contained"
            onPress={() => console.log("Live Updates pressed!")}
            contentStyle={{ flexDirection: "row", alignItems: "center" }}
            icon={() => <EvilIcons name="bell" color="#fff" size={18} />}
          >
            Live Updates
          </Button>
          <Button
            mode="contained"
            onPress={() => console.log("Slotted Sarva Darshan pressed!")}
            contentStyle={{ flexDirection: "row", alignItems: "center" }}
            icon={() => <EvilIcons name="calendar" color="#fff" size={18} />}
          >
            Slotted Sarva Darshan
          </Button>
          <Button
            mode="contained"
            onPress={() => console.log("Today's Schedules pressed!")}
            contentStyle={{ flexDirection: "row", alignItems: "center" }}
            icon={() => <EvilIcons name="clock" color="#fff" size={18} />}
          >
            Today's Schedules
          </Button>
        </View>

        {/* Section: Types of Darshans */}
        <SectionWithGrid
          title="Types of Darshans"
          items={images1.slice(0, 3)}
          images={images}
          onViewMore={() => {
            console.log("Navigating to Darshans");
            router.push("/darshans");
          }}
        />
        {/* Section: Types of Sevas */}
        <SectionWithGrid
          title="Types of Sevas"
          items={images1.slice(0, 6)}
          images={images}
          onViewMore={() => router.push("/darshans")}
        />
        <SectionWithGrid
          title="Accomodation"
          items={images1.slice(0, 2)}
          images={images}
          onViewMore={() => router.push("/darshans")}
        />
        <SectionWithGrid
          title="Places"
          items={images1.slice(0, 3)}
          images={images}
          onViewMore={() => router.push("/darshans")}
        />
        <SectionWithGrid
          title="Hundi"
          items={images1.slice(0, 2)}
          images={images}
          onViewMore={() => router.push("/darshans")}
        />
      </View>
      <View>
        <Button onPress={() => router.push("/darshans")}>
          go to sevas okay
        </Button>
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
