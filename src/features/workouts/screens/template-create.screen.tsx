import { View, Text, TextInput } from "react-native";
import React from "react";
import { useCreateWorkoutTemplate } from "../useWorkoutTemplate";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Button, ButtonText } from "@/components/ui/button";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import TemplateWorkoutItem from "../components/template-workout-item";

const TemplateCreateScreen = () => {
  const [showDebugInfo, setShowDebugInfo] = React.useState(false);
  const { exerciseId } = useLocalSearchParams<{
    exerciseId: string;
  }>();
  const hook = useCreateWorkoutTemplate();

  React.useEffect(() => {
    if (!exerciseId) return;
    hook.addExercise(exerciseId);
  }, [exerciseId]);

  return (
    <SafeAreaView className="px-4 flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex flex-row gap-4 items-center">
          <Text className="text-xl font-semibold">
            {hook.workoutTemplate.title || "Template Title"}
          </Text>
          <SimpleLineIcons
            onPress={() => {}}
            name="options"
            size={15}
            color="blue"
          />
        </View>

        <View className="mt-4">
          <TextInput
            className="border border-gray-300 rounded-xl p-2"
            value={hook.workoutTemplate.title}
            onChangeText={(title) => hook.setTitle(title)}
            placeholder="Template Title"
          />
        </View>

        <View className="mt-2">
          <TextInput
            className="border border-gray-300 rounded-xl p-2"
            value={hook.workoutTemplate.notes || ""}
            onChangeText={(notes) => hook.setNotes(notes)}
            placeholder="Template Notes"
            multiline
            numberOfLines={2}
          />
        </View>

        {hook.workoutTemplate.workOutItems.map((workoutItem, index) => (
          <View key={index} className="mt-4">
            <TemplateWorkoutItem
              workoutIndex={index}
              hook={hook}
              workoutItem={workoutItem}
            />
          </View>
        ))}

        <Button
          onPress={() => hook.addExerciseFlow(hook.workoutTemplate.workOutItems.length - 1)}
          className="border border-black/70 rounded-full my-2"
          variant="outline"
        >
          <ButtonText className="text-black/70">Add Exercise</ButtonText>
        </Button>

        <Button
          onPress={() => hook.finishWorkout()}
          className="bg-blue-600/70 rounded-full my-2"
        >
          <ButtonText className="text-white">Save Template</ButtonText>
        </Button>

        <Button
          onPress={() => hook.clearWorkout()}
          className="border border-red-500 bg-transparent my-2 rounded-full"
          variant="outline"
        >
          <ButtonText className="text-red-500">Cancel</ButtonText>
        </Button>

        <Button
          onPress={() => setShowDebugInfo(!showDebugInfo)}
          className="bg-black/70 my-2"
        >
          <ButtonText className="text-white">Toggle Debug Info</ButtonText>
        </Button>

        {showDebugInfo && (
          <Text style={{ fontFamily: "monospace", fontSize: 14 }}>
            {JSON.stringify(hook.workoutTemplate, null, 2)}
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TemplateCreateScreen;
