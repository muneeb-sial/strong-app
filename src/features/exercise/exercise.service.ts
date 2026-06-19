import { ExerciseType } from "@/src/shared/data/db-data.";
import { ExerciseZodSchemaType } from "./exercise.schema";

export const ExerciseService = {
    createExerciseInstance: (exercise: ExerciseZodSchemaType) => {
        // return realm.write(() => {
        //     return realm.create(ExerciseSchema, {
        //         ...exercise,
        //         ...generateDefaults(),
        //     });
        // });
    },

    getAllExercises: (): ExerciseType[] => {
        // return realm.objects(ExerciseSchema).sorted("createdAt", true) as unknown as ExerciseType[];
    },

    searchExercises: (searchQuery: string): ExerciseType[] => {
        // if (!searchQuery.trim()) {
        //     return realm.objects(ExerciseSchema).sorted("createdAt", true) as unknown as ExerciseType[];
        // }

        // return realm
        //     .objects(ExerciseSchema)
        //     .filtered("name CONTAINS[c] $0", searchQuery.trim())
        //     .sorted("createdAt", true) as unknown as ExerciseType[];
    },

    getExerciseById: (id: string): ExerciseType | undefined => {
        // return realm.objectForPrimaryKey(ExerciseSchema, new Realm.BSON.ObjectId(id)) as unknown as ExerciseType;
    }
};