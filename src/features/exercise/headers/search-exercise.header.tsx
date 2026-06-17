import React, { useState } from "react";
import { View } from "react-native";
import { useDebounce } from "@/shared/hook/useDebounce";
import { Input, InputField } from "../../../components/ui/input";
import { FontAwesome5 } from "@expo/vector-icons";
import { useExerciseSearchStore } from "@/store/exercsie-search.store";

const SearchExerciseHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { setSearchQuery: storeSetSearchQuery } = useExerciseSearchStore();
  const debouncedSearchText = useDebounce(searchQuery, 100);

  React.useEffect(() => {
    storeSetSearchQuery(debouncedSearchText);
  }, [debouncedSearchText]);

  return (
    <View className="w-full flex-row items-center gap-3 mr-10">
      <View className="flex-1">
        <Input
          variant="outline"
          size="md"
          className="rounded-2xl  border-slate-400 border text-base placeholder:text-gray-400 data-[focus=true]:border-gray-800 "
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField
          className="text-black"
            placeholder="Search exercises..." 
            value={searchQuery}
            onChangeText={(e) => setSearchQuery(e)}
          />
        </Input>
      </View>

      <FontAwesome5 name="filter" size={20} />
    </View>
  );
};

export default SearchExerciseHeader;
