import { useEffect, useState } from "react";
import { useCreateMeasurement } from "../useMeasurement";
import { Modal, Text, View } from "react-native";
import { FormInput } from "@/shared/ui/FormInput";
import { Button, ButtonText } from "@/components/ui/button";
import { MaterialIcons } from "@expo/vector-icons";

export default function AddMeasurementModal({ measurementName }: { measurementName: string }) {
    const { form, mutation, onSubmit } = useCreateMeasurement({
      debugMode: false,
    });
    const [visible, setVisible] = useState(false);
  
    useEffect(() => {
      if (measurementName) {
        form.reset({
          bodyPart: measurementName,
          measurement: "0",
          unit: "cm",
        });
      }
    }, [measurementName]);
  
    return (
      <View>
        <MaterialIcons
          onPress={() => setVisible(true)}
          name="add"
          size={24}
          color="black"
        />
        <Modal
          visible={visible}
          transparent
          animationType="fade"
          onRequestClose={() => setVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50 p-8">
            <View className="flex flex-col bg-white p-4 rounded-2xl w-full">
              <View className="flex flex-row">
                <Text className="text-gray-400">{new Date().toDateString()}</Text>
              </View>
  
              <FormInput
                control={form.control}
                name="measurement"
                label={measurementName}
                placeholder="Enter Measurement"
                keyboardType="numeric"
              />
              <View className="flex flex-row justify-end gap-3">
                <Button
                  className="mt-4 border-black/50 border bg-white rounded-md flex justify-center items-center"
                  onPress={() => setVisible(false)}
                >
                  <ButtonText className="text-black/50">Cancel</ButtonText>
                </Button>
                <Button
                  className="mt-4 bg-black  rounded-md flex justify-center items-center"
                  onPress={()=>{
                    form.handleSubmit(onSubmit)()
                    setVisible(false)
                    form.reset()
                }}
                >
                  <ButtonText className="text-white">Save</ButtonText>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }