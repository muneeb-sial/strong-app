import { Controller, FieldValues, Path } from "react-hook-form";
import { Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

type FormInputProps<T extends FieldValues> = {
  control: any; // from useForm
  name: Path<T>; // ensures field name exists in schema
  label: string;
  placeholder?: string;
  options: string[];
};

export function FormInputSelect<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Select an option",
  options = ["please","select","option"],
}: FormInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View className="flex gap-2 flex-col w-full my-2">
          {/* Label */}
          <Text className="text-base font-semibold">{label}</Text>

          {/* Styled container */}
          <View
            className='rounded-2xl  border-slate-400 border px-2 text-base placeholder:text-gray-400'
            style={{
              overflow: "hidden", // ensures rounded corners apply to Picker
            }}
          >
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              onBlur={onBlur}
              dropdownIconColor="gray" // Android only
              style={{
                height: 50,
                fontSize: 16,
                color: value ? "black" : "gray",
                borderRadius: 12,
              }}
            >
              {!options.length && (
                <Picker.Item
                  label={placeholder}
                  value=""
                  color="gray"
                  // enabled={false}
                />
              )}

              {options.map((opt) => (
                <Picker.Item
                  key={ConvertLabelIntoValue(opt)}
                  label={opt}
                  value={ConvertLabelIntoValue(opt)}
                />
              ))}
            </Picker>
          </View>

          {/* Error */}
          {error && <Text className="text-red-500">{error.message}</Text>}
        </View>
      )}
    />
  );
}


const ConvertLabelIntoValue = (label: string) => {
  return label.toLowerCase().replace(" ", "-");
}