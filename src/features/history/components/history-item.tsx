import { WorkOutType, SetsType } from "@/db/schema.type";
import { View, Text } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

const formatDate = (date: Date): string => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${dayName}, ${monthName} ${day}, ${year}, ${hours}:${minutes} ${ampm}`;
};

const formatDuration = (createdAt: Date, finishedAt: Date): string => {
  const diffMs = finishedAt.getTime() - createdAt.getTime();
  const minutes = Math.round(diffMs / (1000 * 60));
  return `${minutes}m`;
};

const calculateSetVolume = (set: SetsType): number => {
  return (set?.weight || 0) * (set?.reps || 0);
};

const findBestSet = (sets: SetsType[]): SetsType | null => {
  if (!sets || sets.length === 0) return null;
  return sets.reduce((best, current) => {
    const bestVolume = calculateSetVolume(best);
    const currentVolume = calculateSetVolume(current);
    return currentVolume > bestVolume ? current : best;
  });
};

const formatBestSet = (set: SetsType | null): string => {
  if (!set || !set?.weight || !set?.reps) return "—";
  return `${set?.weight} kg × ${set?.reps}`;
};

export const HistoryItem = (props: WorkOutType) => {
  const { title, finishedAt, workOutItems, createdAt } = props;

  const totalVolume = workOutItems.reduce((total, item) => {
    return total + item.sets.reduce((sum, set) => sum + calculateSetVolume(set), 0);
  }, 0);

  const duration = (finishedAt && createdAt) ? formatDuration(createdAt, finishedAt) : "—";
  const dummyPRs = 5; // Dummy PR count as requested

  return (
    <View className="rounded-2xl p-4 mb-3 border border-gray-200">
      {/* Header */}
      <Text className="text-base font-semibold">{title}</Text>
      <Text className="text-sm mb-3">{finishedAt ? formatDate(finishedAt) : ""}</Text>

      {/* Column Headers */}
      <View className="flex-row justify-between mb-2">
        <Text className="text-xs font-medium">Sets</Text>
        <Text className="text-xs font-medium">Best set</Text>
      </View>

      {/* Exercise List */}
      <View className="mb-3">
        {workOutItems.map((item) => {
          const bestSet = findBestSet(item.sets);
          return (
            <View key={item._id} className="flex-row justify-between py-1">
              <Text className="text-sm">
                {item.sets.length} × {item.exercise.name}
              </Text>
              <Text className="text-sm">{formatBestSet(bestSet)}</Text>
            </View>
          );
        })}
      </View>

      {/* Footer Stats */}
      <View className="flex-row items-center pt-3 justify-evenly">
        <View className="flex-row items-center">
          <FontAwesome6 name="clock" size={14} color="#9CA3AF" />
          <Text className="text-sm ml-1.5">{duration}</Text>
        </View>
        <View className="flex-row items-center">
          <FontAwesome6 name="weight-hanging" size={14} color="#9CA3AF" />
          <Text className="text-sm ml-1.5">{totalVolume} kg</Text>
        </View>
        <View className="flex-row items-center">
          <FontAwesome6 name="trophy" size={14} color="#9CA3AF" />
          <Text className="text-sm ml-1.5">{dummyPRs} PRs</Text>
        </View>
      </View>
    </View>
  );
};