import { generateDefaults, RealmDb } from "@/db/db";
import { MeasurementZodSchemaType } from "./measurement.schema";
import { BodyPartEnum, MeasurementsType } from "@/db/schema.type";

export const createMeasurementInstance = async (measurement: MeasurementZodSchemaType) => {
    try {

        const realm = await RealmDb();
        if (!realm) {
            console.warn("Realm is not ready yet!");
            throw new Error("Realm is not ready yet!");
        }

        realm.write(() => {
            return realm.create("Measurements", { ...measurement, ...generateDefaults(), measurement: Number(measurement.measurement || 0) });
        });
    }
    catch (error) {
        console.error(error);
        throw error
    }
};

export const getAllMeasurement = async () => {
    const realm = await RealmDb();
    if (!realm) {
        console.warn("Realm is not ready yet!");
        throw new Error("Realm is not ready yet!");
    }
    return realm.objects("Measurements").sorted("createdAt", true) as unknown as MeasurementsType[];
};

export const getMeasurementByBodyPart = async (bodyPart: BodyPartEnum) => {
    const realm = await RealmDb();
    if (!realm) {
        console.warn("Realm is not ready yet!");
        throw new Error("Realm is not ready yet!");
    }
    console.log("Body part received,====>", bodyPart)
    const obj = realm.objects("Measurements").filtered("bodyPart = $0", bodyPart as string).sorted("createdAt", true) as unknown as MeasurementsType[];
    return obj;
};