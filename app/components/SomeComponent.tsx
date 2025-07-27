import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SomeComponent() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <Card
          style={styles.card}
          onPress={() => router.push("/screens/LiveUpdates")}
        >
          <Card.Content style={styles.cardContent}>
            <EvilIcons name="bell" color="#6200ee" size={24} />
            <Text style={styles.cardText}>Latest News</Text>
          </Card.Content>
        </Card>
        <Card
          style={styles.card}
          onPress={() => router.push("/screens/SlottedSarvaDarshan")}
        >
          <Card.Content style={styles.cardContent}>
            <EvilIcons name="calendar" color="#6200ee" size={24} />
            <Text style={styles.cardText}>Slotted Sarva Darshan</Text>
          </Card.Content>
        </Card>
        <Card
          style={styles.card}
          onPress={() => router.push("/screens/TodaysSchedules")}
        >
          <Card.Content style={styles.cardContent}>
            <EvilIcons name="clock" color="#6200ee" size={24} />
            <Text style={styles.cardText}>Today's Schedules</Text>
          </Card.Content>
        </Card>
        {/* Add more cards below this line to see them wrap to new lines automatically */}
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
    marginBottom: 12,
    elevation: 2,
    borderRadius: 10,
    alignSelf: "center",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  cardText: {
    marginLeft: 8,
    fontSize: 15,
    flexShrink: 1,
  },
});
