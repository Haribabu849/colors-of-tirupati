import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

// Helper to split array into chunks of 3
function chunkArray(array: any[], size: number) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

type ImagesMap = { [key: string]: any };
type SectionWithGridProps = {
  title: string;
  items: { path: string; name: string }[];
  images: ImagesMap;
  onViewMore?: () => void;
  ImageWithLabel: React.ComponentType<{
    source: any;
    label: string;
    onPress?: () => void;
  }>;
};

const SectionWithGrid = ({
  title,
  items,
  images,
  onViewMore,
  ImageWithLabel,
}: SectionWithGridProps) => {
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
            gap: 4,
          }}
          style={{ marginLeft: 8 }}
          labelStyle={{
            fontSize: 10,
            textAlign: "center",
            verticalAlign: "middle",
            color: "",
          }}
        >
          VIEW MORE
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
              onPress={
                item.route ? () => onViewMore && onViewMore() : undefined
              }
            />
          ))}
        </View>
      ))}
    </>
  );
};

export default SectionWithGrid;
