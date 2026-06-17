import {
  View,
  Text,
  FlatList,
  TouchableNativeFeedback,
  ScrollView,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { BodyPartEnum } from "@/db/schema.type";
import Animated, { FadeIn } from "react-native-reanimated";
import { useGetMeasurementByBodyPart } from "@/features/measurement/useMeasurement";
import MeasurementChart from "@/features/measurement/components/MeasurementChart";
import AddMeasurementModal from "@/features/measurement/components/AddMeasurementModal";

export const MeasurementGraphScreen = () => {
  const { MeasurementName } = useLocalSearchParams<{
    MeasurementName: string;
  }>();
  const { data: measurementData } = useGetMeasurementByBodyPart(
    MeasurementName as BodyPartEnum,
  );
  console.log({ measurementData });
  return (
    <View className="flex flex-col">
      <MeasurementChart
        data={
          measurementData &&
          measurementData
            .map((e) => ({
              value: Number(e.measurement),
              label: e.createdAt.toDateString(),
            }))
            .reverse()
        }
      />

      <View className="flex flex-row justify-between px-4 mt-4">
        <Text>History</Text>
        <AddMeasurementModal measurementName={MeasurementName} />
      </View>
      <FlatList
        data={measurementData}
        // Use ListHeaderComponent for anything that was above the list
        ListHeaderComponent={<View className="mt-4" />}
        // Move your ScrollView padding here
        contentContainerStyle={{ paddingBottom: 10 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id.toString()} // Ensure you have a key
        renderItem={({ item }) => (
          <Animated.View
            entering={FadeIn}
            className="w-full overflow-hidden py-5"
          >
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple(
                "rgba(0,0,0,0.1)",
                true,
              )}
              useForeground={true}
            >
              <View className="px-4 flex justify-between flex-row">
                <Text className="text-gray-800">
                  {item.createdAt.toDateString()}
                </Text>
                <Text className="font-bold">{item.measurement}</Text>
              </View>
            </TouchableNativeFeedback>
          </Animated.View>
        )}
      />
      {/* <ScrollView
        contentContainerStyle={{ paddingBottom: 10 }} // leave space at bottom
        showsVerticalScrollIndicator={false} // optional
      >
        {measurementData && (
          <FlatList
            data={measurementData}
            renderItem={({ item }) => (
              <>
                <Animated.View entering={FadeIn} className="w-full overflow-hidden py-5">
                  <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple(
                      "black/50",
                      true
                    )}
                    useForeground={true}
                  >
                    <View className="px-4 flex justify-between flex-row">
                      <Text>{item.createdAt.toDateString()}</Text>
                      <Text>{item.measurement}</Text>
                    </View>
                  </TouchableNativeFeedback>
                </Animated.View>
              </>
            )}
          />
        )}
      </ScrollView> */}
    </View>
  );
};
