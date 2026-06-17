import { Stack } from "expo-router";

export default function MeasurementLayout () {
  return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{title: "Measurement"}} />
        <Stack.Screen name="graphs" options={{title: "Graphs"}} />
      </Stack>
  );
};
