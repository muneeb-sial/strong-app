import "../global.css";
import { Slot } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { Toaster } from "sonner-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient();
export default function Layout() {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <Slot />
        </QueryClientProvider>
      </GestureHandlerRootView>
    </>
  );
}
