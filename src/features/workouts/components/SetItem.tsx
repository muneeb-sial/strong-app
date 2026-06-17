import { View, Text, TextInput, Pressable } from "react-native";
import React from "react";
import { SetsSchemaType } from "../workout.schema";
import { useCreateWorkoutReturnType } from "../useWorkout";
import { AntDesign } from "@expo/vector-icons";
import { toast } from "sonner-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { isNumeric } from "@/shared/utils";
import { useWorkoutStoreReturnType } from "@/store/workout.store";

const SetItem = ({
  set,
  workoutIndex,
  setIndex,
  hook,
}: {
  set: SetsSchemaType;
  workoutIndex: number;
  setIndex: number;
  hook: useWorkoutStoreReturnType;
  // hook: useCreateWorkoutReturnType;
}) => {
  const scale = useSharedValue(1); // start at normal scale

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(1.03, {
      damping: 8,
      stiffness: 150,
      mass: 0.4,
      velocity: 1,
    }); // scale up
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 8,
      stiffness: 150,
      mass: 0.4,
      velocity: 1,
    }); // scale back to normal
  };

  return (
    <Animated.View
      style={animatedStyle}
      className={`flex justify-between items-center flex-row my-1 rounded-2xl ${
        set.isDone && "bg-green-200"
      } p-2 rounded-2xl`}
    >
      <Text className="text-lg">{setIndex}</Text>

      <SetTextInput
        set={set}
        workoutIndex={workoutIndex}
        setIndex={setIndex}
        hook={hook}
        type="reps"
      />

      <SetTextInput
        set={set}
        workoutIndex={workoutIndex}
        setIndex={setIndex}
        hook={hook}
        type="weight"
      />

      <SetIsDoneCheckInput
        set={set}
        workoutIndex={workoutIndex}
        setIndex={setIndex}
        hook={hook}
        type="isDone"
        handlePressIn={handlePressIn}
        handlePressOut={handlePressOut}
      />
    </Animated.View>
  );
};

const SetTextInput = ({
  set,
  workoutIndex,
  setIndex,
  hook,
  type,
}: {
  set: SetsSchemaType;
  workoutIndex: number;
  setIndex: number;
  hook: useWorkoutStoreReturnType;
  // hook: useCreateWorkoutReturnType;
  type: string;
}) => {
  return (
    <View className="flex justify-center items-center my-1 bg-slate-200 w-[4.5rem] py-1 rounded-2xl px-2">
      <TextInput
        className=" text-lg"
        value={set[type]?.toString() || "0"}
        keyboardType="numeric"
        onChangeText={(data) => {
          if (Number(data) > 10000) return;
          const val = isNumeric(data) ? parseInt(data) : 0;
          hook.UpdateSet({
            workoutIndex,
            setIndex,
            setData: {
              [type]: val,
            },
          });
        }}
      />
    </View>
  );
};

const SetIsDoneCheckInput = ({
  set,
  workoutIndex,
  setIndex,
  hook,
  type,
  handlePressIn,
  handlePressOut,
}: {
  set: SetsSchemaType;
  workoutIndex: number;
  setIndex: number;
  hook: useCreateWorkoutReturnType;
  type: string;
  handlePressIn: () => void;
  handlePressOut: () => void;
}) => {
  return (
    <Pressable
      onPressIn={() => {
        handlePressIn();
        if (set.reps * set.weight === 0) {
          toast.error("Completed the set please");
          return;
        }
        hook.UpdateSet({
          workoutIndex,
          setIndex,
          setData: {
            [type]: !set.isDone,
          },
        });
      }}
      onPressOut={() => {
        handlePressOut();
      }}
      className={`flex justify-center items-center my-1  w-[4.5rem] py-4 rounded-2xl px-2 ${
        set.isDone ? "bg-green-500" : "bg-slate-200"
      }`}
    >
      <AntDesign
        name="check"
        color={set.isDone ? "white" : "black"}
        size={20}
      />
    </Pressable>
  );
};
export default SetItem;
