import { View } from "react-native";
import React from "react";
import { LineChart } from "react-native-gifted-charts";
const data = [
  { value: 50, label: "Jan" },
  { value: 80, label: "Feb" },
  { value: 90, label: "Mar" },
  { value: 70, label: "Apr" },
];
type MeasurementChartProps = {
  data: Array<{ value: number; label: string }>;
};
const MeasurementChart = ({ data }: MeasurementChartProps) => {
  return (
    <View className="p-2 mr-2">
      <LineChart
        width={280}
        curved
        data={data}
        // maxValue={100} // set upper bound
        // yAxisOffset={0} // set lower bound
        noOfSections={3}
      />
    </View>
  );
};

export default MeasurementChart;
