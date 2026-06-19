import { View } from 'react-native'
import React from 'react'
import { MaterialIcons } from "@expo/vector-icons"
import { Link } from 'expo-router'

export const ListAllExerciseHeaderRight = () => {
  return (
    <View className='px-4 flex flex-row gap-4'>
      <Link href="/exercises/search" asChild>
        <MaterialIcons name="search" size={24} color="black" />
      </Link>
      <Link href="/exercises/create" asChild>
        <MaterialIcons name="add" size={24} color="black" />
      </Link>
    </View>
  )
}