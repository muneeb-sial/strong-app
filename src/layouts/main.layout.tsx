import { TouchableOpacity } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import {
  Ionicons,
  FontAwesome6,
  FontAwesome5,
  Entypo,
} from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
const TabButton = ({
  props,
  renderIcon,
}: {
  props: unknown;
  renderIcon: (isFocused: boolean) => React.ReactNode;
}) => {
  const isFocused = useIsFocused();
  return (
    <TouchableOpacity {...(props as any)} className="mt-1">
      {renderIcon(isFocused)}
    </TouchableOpacity>
  );
};

export const MainNavigationTabsLayout = () => {
  const tabs: {
    name: string;
    title: string;
    options?: BottomTabNavigationOptions
    headerRight?: () => React.ReactNode;
    renderIcon: (isFocused: boolean) => React.ReactNode;
  }[] = [
    {
      name: "profile/index",
      title: "Profile",
      renderIcon: (isFocused) => (
        <Ionicons name="person" size={24} color={isFocused ? "black" : "gray"} />
      ),
    },
    {
      name: "history/index",
      title: "History",
      renderIcon: (isFocused) => (
        <FontAwesome6
          name="clock"
          size={24}
          color={isFocused ? "black" : "gray"}
        />
      ),
    },
    {
      name: "workout",
      title: "Workout",
      renderIcon: (isFocused) => (
        <FontAwesome5 name="plus" size={30} color={isFocused ? "black" : "gray"} />
      ),
      options:{
        headerShown: false,
      },
    },
    {
      name: "measurement",
      title: "Measurement",
      renderIcon: (isFocused) => (
        <Entypo name="ruler" size={24} color={isFocused ? "black" : "gray"} />
      ),
    },
    {
      name: "exercises",
      title: "Exercises",
      options:{
        headerShown: false,
      },
      renderIcon: (isFocused) => (
        <FontAwesome6
          name="dumbbell"
          size={24}
          color={isFocused ? "black" : "gray"}
        />
      ),
    },
  ];

  const nonTabNavigationItems: Array<{
    name: string;
    options: Record<string, unknown>;
  }> = [
    {
      name: "workout/create",
      options: {
        href: null,
        title: "Create Workout",
        tabBarStyle: { display: "none" },
      },
    },
    {
      name: "workout/search-exercise",
      options: {
        href: null,
        title: "Search Exercise",
        tabBarStyle: { display: "none" },
      },
    },
    {
      name: "measurement/graphs",
      options: {
        title: "Measurement Graphs",
        href: null,
        tabBarStyle: { display: "none" },
      },
    },
  ];

  return (
    <Tabs screenOptions={{ headerShown: true }}>
      {tabs.map((t) => (
        <Tabs.Screen
          key={t.name}
          name={t.name}
          options={{
            title: t.title,
            headerRight: t.headerRight,
            tabBarButton: (props) => (
              <TabButton props={props} renderIcon={t.renderIcon} />
            ),
            ...t.options,
          }}
        />
      ))}

      {nonTabNavigationItems.map((item) => (
        <Tabs.Screen key={item.name} name={item.name} options={item.options} />
      ))}
    </Tabs>
  );
};