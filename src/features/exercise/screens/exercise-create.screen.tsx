import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React from "react";
import { Button, ButtonText } from "@/components/ui/button";
import { FormInputSelect } from "@/shared/ui/FormInputSelect";
import { bodyPartData, exerciseCategoryData } from "@/shared/data/exercise";
import { useCreateExercise } from "../useExercise";
import { FormInput } from "@/shared/ui/FormInput";

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
          size="xl"
          onPress={form.handleSubmit(onSubmit)}
        >
          <ButtonText className="text-white">Submit</ButtonText>
          {mutation.isPending && <ActivityIndicator size="small" color="white" />}
        </Button>
      </View>
    </ScrollView>
  );
};