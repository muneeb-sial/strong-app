import { useLocalSearchParams } from "expo-router";
import TemplateDetailScreen from "@/features/workouts/screens/template-detail.screen";

export default function TemplateDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <TemplateDetailScreen id={id} />;
}
