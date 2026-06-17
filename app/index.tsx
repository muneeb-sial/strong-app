import { View, Text, Button } from "react-native";
import { Link } from "expo-router";
import { toast } from "sonner-native";

const Main = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text>Main</Text>
      <Link href={"/exercises/list-all"} asChild>
        <Button title="Go to Exercises" />
      </Link>
      <Button
        title="toast check"
        onPress={() => {
          toast.success("toast check");
          console.log("toast check");
        }}
      />
    </View>
  );
};

export default Main;
