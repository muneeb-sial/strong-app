import { View, FlatList, ActivityIndicator } from "react-native";
import { useGetAllExercise } from "../useExercise";
import ExerciseItem from "../components/ExerciseItem";

export const ListAllExercisesScreen = () => {
  const { data, isLoading } = useGetAllExercise();

  if (isLoading) return <ActivityIndicator />;

  return (
    <View className="p-0">
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
