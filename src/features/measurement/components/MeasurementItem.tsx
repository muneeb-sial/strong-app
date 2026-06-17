import { router } from "expo-router";
import { View, Text, TouchableNativeFeedback } from "react-native";

const MeaurementItem = ({ MeasurementName }: { MeasurementName: string }) => {
  return (
    <View className="w-full overflow-hidden py-4">
      <TouchableNativeFeedback
        onPress={() => {
          router.push({
            pathname: "/measurement/graphs",
            params: { MeasurementName },
          });
        }}
        background={TouchableNativeFeedback.Ripple("black/20", true)}
        useForeground={true}
      >
        <View className="flex flex-row items-center gap-2">
          <View className="flex flex-col ">
            <View className="flex flex-row items-center gap-1">
              <Text className="text-base font-semibold">{MeasurementName}</Text>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default MeaurementItem;
