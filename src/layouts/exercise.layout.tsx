import {ListAllExerciseHeaderRight} from "@/src/features/exercise/headers/list-all-exercise.header";
import SearchExerciseHeader from "@/src/features/exercise/headers/search-exercise.header";
import { Stack } from "expo-router";

export default function ExerciseLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="list-all"
        options={{
          title: "Exercises",
          headerRight: () => <ListAllExerciseHeaderRight />,
        }}
      />
      <Stack.Screen name="create" options={{ title: "Create Exercise" }} />
      <Stack.Screen
        name="search"
        options={{
          headerTitle: () => <SearchExerciseHeader />,
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
