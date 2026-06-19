import { View, FlatList, ActivityIndicator } from "react-native";
import { useGetAllExercise, useSearchExercises } from "../useExercise";
import ExerciseItem from "../components/ExerciseItem";
import { useExerciseSearchStore } from "@/src/store";

export const SearchExercisesScreen = () => {
  const { searchQuery } = useExerciseSearchStore();
  const { data: allData, isLoading: allLoading } = useGetAllExercise();
  const { data: searchData, isLoading: searchLoading } = useSearchExercises(
    searchQuery || "",
  );
  const isLoading = searchQuery ? searchLoading : allLoading;
  const data = searchQuery ? searchData : allData;

  return (
    <View className="p-0">
      {isLoading && <ActivityIndicator />}
      {data && (
        <FlatList
          data={data || []}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => <ExerciseItem exercise={item} />}
        />
      )}
    </View>
  );
};
