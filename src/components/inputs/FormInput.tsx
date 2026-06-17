import { Controller, FieldValues, Path } from "react-hook-form";
import { TextInput, Text, View, KeyboardTypeOptions } from "react-native";

type FormInputProps<T extends FieldValues> = {
  control: any; // from useForm
  name: Path<T>; // ensures field name exists in schema
  label: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
};

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  keyboardType,
}: FormInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View className='flex gap-2 flex-col  w-full my-2'>
          <Text className="text-base">{label}</Text>
          <TextInput
            className='rounded-2xl  border-slate-400 border py-3 px-4 text-base placeholder:text-gray-400'
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType={keyboardType || "default"}
          />
          {error && <Text style={{ color: "red" }}>{error.message}</Text>}
        </View>
      )}
    />
  );
}
