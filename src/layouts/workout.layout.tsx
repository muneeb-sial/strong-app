import { Button, ButtonText } from "@/components/ui/button";
import { useWorkoutStore } from "@/store/workout.store";
import { Stack } from "expo-router";
import { Text } from "react-native";
import { useWorkoutRepo } from "@/features/workouts/workout.service";
import { toast } from "sonner-native";

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
                  console.log("Save");
                  toast.success("sdsd");
                  const payload = hook.FinishWorkoutReturn();
                  console.log({ payload });
                  if (payload) createWorkoutInstance(payload);
                }}
              >
                <ButtonText>Save</ButtonText>
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
