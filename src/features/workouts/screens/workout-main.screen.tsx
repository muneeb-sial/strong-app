import { View, ScrollView } from "react-native";
import { WorkoutQuickStart } from "../components/workout-quick-start";
import { WorkoutTemplates } from "../components/workout-templates";
import { useGetAllWorkoutTemplates } from "../useWorkoutTemplate";

const WorkoutMainScreen = () => {
  const { data: workoutsData } = useGetAllWorkoutTemplates();

  return (
    <View className="flex-1 bg-primary">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <WorkoutQuickStart />
        <WorkoutTemplates title="My Templates" templates={workoutsData || []} />
      </ScrollView>
    </View>
  );
};

export default WorkoutMainScreen;
