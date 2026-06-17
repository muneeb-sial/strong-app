import { View, Text, FlatList } from "react-native";
import React from "react";
import MeaurementItem from "@/features/measurement/components/MeasurementItem";
import { measurementBodyPartData } from "@/shared/data/measurements";

export const AllMeasurementListScreen = () => {
  return (
    <View>
      <FlatList
        className="px-4"
        data={measurementBodyPartData}
        renderItem={({ item }) => <MeaurementItem MeasurementName={item} />}
      />
    </View>
  );
};
