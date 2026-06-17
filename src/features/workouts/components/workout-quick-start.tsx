import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Button, ButtonText } from "@/components/ui/button";

export const WorkoutQuickStart = () => {
  return (
    <View className="mb-6">
      <Text className="text-primary-foreground text-lg font-semibold mb-3">
        Quick start
      </Text>

      <Link href="/workout/create" asChild>
        <Button className="rounded-lg bg-black text-white">
          <ButtonText className="text-white tracking-widest">
            START AN EMPTY WORKOUT
          </ButtonText>
        </Button>
      </Link>
    </View>
  );
};