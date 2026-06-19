import { View, ScrollView, ActivityIndicator } from "react-native";
import React from "react";
import { Button,  } from "@/src/components/ui/button";
import { bodyPartData, exerciseCategoryData } from "@/src/shared/data/exercise";
import { useCreateExercise } from "../useExercise";
import { FormInput } from "@/src/components/inputs/FormInput";
import { FormInputSelect } from "@/src/components/inputs/FormInputSelect";
import { Text } from "@/src/components/ui/text";

export const ExerciseCreateScreen = () => {
  const { form, mutation, onSubmit } = useCreateExercise({ debugMode: false });
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 p-4 gap-4">
        <FormInput
          control={form.control}
          name="name"
          label="Name"
          placeholder="Enter name"
        />
        <FormInputSelect
          control={form.control}
          name="majorMuscleHit"
          label="Body Part"
          placeholder="Enter body part"
          options={bodyPartData}
        />
        <FormInputSelect
          control={form.control}
          name="exerciseCategory"
          label="Exercise Category"
          placeholder="Enter exercise category"
          options={exerciseCategoryData}
        />
        <Button
          disabled={mutation.isPending}
          variant={"default"}
          className="bg-black mt-4 rounded-full active:scale-90 duration-300 data-[active=true]:bg-black/70 transition-all"
          onPress={form.handleSubmit(onSubmit)}
        >
          <Text className="text-white">Submit</Text>
          {mutation.isPending && <ActivityIndicator size="small" color="white" />}
        </Button>
      </View>
    </ScrollView>
  );
};