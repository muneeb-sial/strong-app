import { Stack } from "expo-router";
import { useWorkoutRepo } from "@/src/features/workouts/workout.service";
import { useWorkoutStore } from "@/src/store/workout.store";
import { Button } from "../components/ui/button";
import { Text } from "../components/ui/text";

export default function WorkoutLayout() {
  const hook = useWorkoutStore();
  const { createWorkoutInstance } = useWorkoutRepo();
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Workouts",
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          title: "Create Workout",
          headerRight: () => (
            <>
              <Button
                onPress={() => {
                  const payload = hook.FinishWorkoutReturn();
                  if (payload) createWorkoutInstance(payload);
                }}
              >
                <Text>Save</Text>
              </Button>
            </>
          ),
        }}
      />
      <Stack.Screen
        name="search-exercise"
        options={{
          title: "Search Exercise",
        }}
      />
      <Stack.Screen
        name="template/create"
        options={{
          title: "Create Template",
        }}
      />
      <Stack.Screen
        name="template/[id]"
        options={{
          title: "Template Detail",
        }}
      />
    </Stack>
  );
}
