import { generateDefaults } from "@/db/db";
import { WorkoutSchemaType } from "./workout.schema";
import { WorkOutType } from "@/db/schema.type";
import { BSON } from "realm";
import { useRealm } from "@realm/react";

export const useWorkoutRepo = () => {
    const realm = useRealm();

    const createWorkoutInstance = async (workout: WorkoutSchemaType) => {
        if (!realm) throw new Error("Realm is not ready yet!");

        realm.write(() => {
            // Create the Workout first
            const workoutInstance = realm.create("WorkOut", {
                title: workout.title,
                notes: workout.notes || "",
                isFinished: workout.isFinished || false,
                finishedAt: workout.isFinished ? new Date() : null,
                workOutItems: [],
                ...generateDefaults(),
            });

            // Map workout items
            workout.workOutItems.forEach((e) => {
                const exerciseObjectId = new BSON.ObjectId(e.exerciseId);
                const exercise = realm.objectForPrimaryKey("Exercise", exerciseObjectId);

                if (!exercise) throw new Error(`Exercise not found: ${exerciseObjectId}`);

                // Create WorkoutItem
                const workoutItem = realm.create("WorkOutItem", {
                    exercise,
                    isDone: e.isDone || false,
                    notes: e.notes || "",
                    sets: [],
                    ...generateDefaults(),
                });

                // Create Sets
                e.sets.forEach((setItem) => {
                    const set = realm.create("Sets", {
                        exercise,
                        reps: Number(setItem.reps) || 0,
                        weight: Number(setItem.weight) || 0,
                        setType: setItem.setType || "",
                        rpe: Number(setItem.rpe) || 0,
                        isDone: !!e.isDone,
                        ...generateDefaults(),
                    });

                    workoutItem.sets.push(set);
                });

                // Attach item to workout
                workoutInstance.workOutItems.push(workoutItem);
            });

            console.log("✅ Workout created:", workoutInstance._id.toHexString());
        });
    };

    const getAllWorkouts = () => {
        return realm.objects("WorkOut").sorted("createdAt", true) as unknown as WorkOutType[];
    };

    const getWorkoutById = (id: string) => {
        const obj = realm.objects("WorkOut").filtered("_id = $0", id) as unknown as WorkOutType[];
        return obj;
    };
    
    return {
        createWorkoutInstance,
        getAllWorkouts,
        getWorkoutById,
    };
}
