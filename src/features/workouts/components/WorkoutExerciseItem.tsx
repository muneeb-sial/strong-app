import { View, Text, TouchableNativeFeedback } from "react-native";
import { capitalize, convertEnumToLabel } from "@/shared/utils";
import { router } from "expo-router";
import { ExerciseType } from "@/db/schema.type";

type Props = {
  exercise: ExerciseType;
  workoutIndex: string;
  mode?: "workout" | "template";
};

export const WorkoutExerciseItem = ({ exercise, workoutIndex, mode = "workout" }: Props) => {
  return (
    <View className="w-full overflow-hidden py-4">
      <TouchableNativeFeedback
        onPress={() => {
          const pathname = mode === "template" ? "/workout/template/create" : "/workout/create";
          router.replace({
            pathname,
            params: {
              workoutIndex,
              exerciseId: exercise._id,
            },
          });
        }}
        background={TouchableNativeFeedback.Ripple("black/10", true)}
        useForeground={true}
      >
        <View className="flex flex-row items-center gap-2">
          <View className="w-14 h-14 rounded-full flex justify-center items-center">
            <Text className="text-2xl font-bold">
              {exercise.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View className="flex flex-col ">
            <View className="flex flex-row items-center gap-1">
              <Text className="text-base font-semibold">{exercise.name}</Text>
              <Text className="text-xs text-black/50 font-semibold">
                ({convertEnumToLabel(capitalize(exercise.exerciseCategory))})
              </Text>
            </View>
            <Text className="text-sm text-black/50">
              {convertEnumToLabel(capitalize(exercise.majorMuscleHit))}
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};
