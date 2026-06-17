import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { WorkOutItemSchemaType } from "../workout.schema";
import SetItem from "./SetItem";
import { useCreateWorkoutReturnType } from "../useWorkout";
import { Button, ButtonText } from "@/components/ui/button";
import { useGetExerciseById } from "@/features/exercise/useExercise";
import Animated, {
  Easing,
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  JumpingTransition,
} from "react-native-reanimated";
import { useWorkoutStoreReturnType } from "@/store/workout.store";

const WorkoutItem = ({
  workoutItem,
  workoutIndex,
  hook,
}: {
  workoutItem: WorkOutItemSchemaType;
  workoutIndex: number;
  hook: useWorkoutStoreReturnType;
  // hook: useCreateWorkoutReturnType;
}) => {
  const { data, refetch } = useGetExerciseById(workoutItem.exerciseId);
  const height = useSharedValue(94); // initial height in px

  const increaseHeight = () => {
    height.value += 94; // +5.9 rem each time
  };
  useEffect(() => {
    refetch();
  }, [workoutItem.exerciseId]);

  return (
    <View>
      <Text className="text-xl mt-4">{data[0]?.name}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 6,
        }}
      >
        <Text>Set</Text>
        <Text className="w-[4.5rem] py-2 rounded-xl text-lg">Weight</Text>
        <Text className="w-[4.5rem] py-2 rounded-xl text-lg">Reps</Text>
        <Text className="w-[4.5rem] py-2 rounded-xl text-lg">Rest</Text>
      </View>
      <Text> </Text>
      <Animated.View
        layout={JumpingTransition}
        className="flex-col flex"
        // style={animatedStyle}
      >
        {workoutItem.sets.map((set, index) => (
          <Animated.View
            key={index}
            className={"h-[94px] overflow-hidden w-full"}
            entering={FadeInUp.duration(100)
              .easing(Easing.bounce)
              .springify()
              .damping(50)}
          >
            <SetItem
              setIndex={index}
              workoutIndex={workoutIndex}
              hook={hook}
              key={index}
              set={set}
            />
          </Animated.View>
        ))}
      </Animated.View>
      <Button
        onPress={() => {
          increaseHeight();
          hook.AddSetToWorkoutItem(workoutIndex);
        }}
        className="bg-black/70 my-2"
      >
        <ButtonText className="text-white">Add Set</ButtonText>
      </Button>
    </View>
  );
};

export default WorkoutItem;
