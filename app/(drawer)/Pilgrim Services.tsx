import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ImageWithLabel from "../components/ImageWithLabel";
import SectionWithGrid from "../components/SectionWithGrid";
type ImagesMap = { [key: string]: any };
const images: ImagesMap = {
  "darshan-ticket.png": require("@/assets/images/darshan-ticket.png"),
  "special-darshan.png": require("@/assets/images/special-darshan.png"),
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
const mergedImages = [
  {
    path: "special-darshan.png",
    name: "Special Darshan - 300rs",
    route: "/darshans",
  },
  {
    path: "darshan-ticket.png",
    name: "Special Darshan Tiruchanur",
    route: "/ssd-tiruchanur",
  },
  {
    path: "ssd-token.png",
    name: "Slotted Sarva Darshan",
    route: "/ssd-tiruchanur",
  },
  {
    path: "arjitha-seva.png",
    name: "Arjitha Seva",
    route: "/arjitha-seva",
  },
  {
    path: "virtual-seva.png",
    name: "Virtual Seva",
    route: "/virtual-seva",
  },
  {
    path: "angapradakshanam.png",
    name: "Angapradakshanam",
    route: "/angapradakshanam",
  },
  {
    path: "electronic-hundi.png",
    name: "Electronic Hundi",
    route: "/electronic-hundi",
  },
  {
    path: "kalyana-vedhika.png",
    name: "Kalyana Vedhika",
    route: "/kalyana-vedhika",
  },
  {
    path: "kalyana-mandapam.png",
    name: "Kalyana Mandapam",
    route: "/kalyana-mandapam",
  },
  {
    path: "srivani-trust.png",
    name: "Srivani Trust Donations",
    route: "/srivani-trust",
  },
  {
    path: "diaries.png",
    name: "Diaries/Calendars",
    route: "/diaries-calendars",
  },
  {
    path: "sapthagiri-magazine.png",
    name: "Sapthagiri Magazine",
    route: "/sapthagiri-magazine",
  },
  {
    path: "accomodation.png",
    name: "Accomodation",
    route: "/accomodation",
  },
  {
    path: "swami-vari-hundi.png",
    name: "Swamivari (E-Hundi)",
    route: "/swami-vari-hundi",
  },
  {
    path: "ammavari-hundi.png",
    name: "Ammavari (E-Hundi)",
    route: "/ammavari-hundi",
  },
];

const PilgrimServices = () => {
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 0 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <SectionWithGrid
          title={"PilgrimServices"}
          items={mergedImages}
          images={images}
          ImageWithLabel={ImageWithLabel}
        />
      </View>
    </ScrollView>
  );
};

export default PilgrimServices;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "white",
    paddingBottom: 10,
  },
});
