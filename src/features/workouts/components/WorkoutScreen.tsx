import { View, Text, TextInput } from "react-native";
import React, { useEffect } from "react";
import { useCreateWorkout } from "../useWorkout";
import { useGetWorkoutTemplateById } from "../useWorkoutTemplate";
import { SimpleLineIcons } from "@expo/vector-icons";
import WorkoutItem from "./WorkoutItem";
import { Button, ButtonText } from "@/components/ui/button";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import {
  SetTypeEnum,
  WorkOutItemTemplateType,
  WorkOutType,
} from "@/db/schema.type";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useWorkoutStore } from "@/store/workout.store";
import { toast } from "sonner-native";

const WorkoutScreen = () => {
  // const [showDebugInfo, setShowDebugInfo] = React.useState(false);
  const { getItem, setItem } = useAsyncStorage("workout");
  const { workoutIndex, exerciseId, templateId } = useLocalSearchParams<{
    workoutIndex: string;
    exerciseId: string;
    templateId?: string;
  }>();
  const hook = useWorkoutStore();
  // const hook = useCreateWorkout();
  const { data: template } = useGetWorkoutTemplateById(templateId);

  // Load workout from template
  const initializedRef = React.useRef(false);

  useEffect(() => {
    if (!templateId || !template || initializedRef.current) return;

    initializedRef.current = true;

    const getExerciseId = (item: WorkOutItemTemplateType): string => {
      if (typeof item.exercise === "string") {
        return item.exercise;
      }
      return item.exercise._id || "";
    };

    const workoutItems = template.workOutItems.map((item) => {
      const exerciseId = getExerciseId(item);
      const numberOfSets = item.numberOfSets || 1;

      return {
        exerciseId,
        sets: Array.from({ length: numberOfSets }, () => ({
          exerciseId,
          rpe: 0,
          setType: SetTypeEnum.NORMAL as string,
          weight: 0,
          reps: 0,
          restTimmer: 0,
          isDone: false,
        })),
        notes: "",
        isDone: false,
      };
    });

    hook.setWorkout({
      title: template.title || "Untitled Workout",
      notes: template.notes || "",
      workOutItems: workoutItems,
      isFinished: false,
      finishedAt: new Date(),
    });
  }, [templateId, template?._id]);

  useEffect(() => {
    if (!exerciseId) return;
    console.log("adding");
    (async () => {
      let workout = await getItem();
      const parsedWorkout: WorkOutType = JSON.parse(workout);
      console.log({ parsedWorkout });
      let workoutItems = parsedWorkout.workOutItems;
      hook.setWorkout(() => ({
        ...parsedWorkout,
        workOutItems: [
          ...workoutItems,
          {
            exerciseId,
            sets: [
              {
                exerciseId,
                rpe: 0,
                setType: SetTypeEnum.NORMAL as string,
                weight: 0,
                reps: 0,
                restTimmer: 0,
                isDone: false,
              },
            ],
            notes: "",
            isDone: false,
          },
        ],
      }));
    })();
  }, [exerciseId]);

  return (
    <SafeAreaView className="px-4">
      <ScrollView
        // className="flex-1 px-4 py-8"
        contentContainerStyle={{ paddingBottom: 10 }} // leave space at bottom
        showsVerticalScrollIndicator={false} // optional
      >
        <View className="flex flex-row gap-4 items-center">
          <Text className="text-xl">
            Workout Title {hook.workout.title || "Title here"}
          </Text>
          <SimpleLineIcons
            onPress={() => {}}
            name="options"
            size={15}
            color="blue"
          />
        </View>
        <View>
          <TextInput
            className="border border-gray-300 rounded-xl p-2 mt-4"
            value={hook.workout.notes}
            onChangeText={(notes) => hook.UpdateWorkoutNotes({ notes })}
            placeholder="Workout Notes"
          />
        </View>

        {hook.workout.workOutItems.map((workoutItem, index) => (
          <Animated.View key={index} entering={FadeInUp}>
            <WorkoutItem
              workoutIndex={index}
              hook={hook}
              workoutItem={workoutItem}
            />
          </Animated.View>
        ))}
        <Button
          onPress={() =>
            setItem(JSON.stringify(hook.workout), () => {
              hook.AddExercise(hook.workout.workOutItems.length - 1);
            })
          }
          className="border border-black/70 my-2"
        >
          <ButtonText className="text-black/70">Add Workout Item</ButtonText>
        </Button>

        <Button
          className="bg-transparent"
          onPress={() => hook.ClearWorkout()}
          // className="border border-red-500 bg-transparent my-2 rounded-full"
        >
          <ButtonText className="text-red-500">Cancel Workout</ButtonText>
        </Button>
        {/* <Button
          onPress={() => setShowDebugInfo(!showDebugInfo)}
          className="bg-black/70 my-2"
        >
          <ButtonText className="text-white">Toggle Debug Info</ButtonText>
        </Button>

        {showDebugInfo && (
          <Text style={{ fontFamily: "monospace", fontSize: 14 }}>
            {JSON.stringify(hook.workout, null, 2)}
          </Text>
        )} */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkoutScreen;
