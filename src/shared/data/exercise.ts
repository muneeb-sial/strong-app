import { capitalize, convertEnumToLabel } from "@/src/lib/utils";
import { BodyPartEnum, ExerciseCategoryEnum } from "./db-data.";

export const bodyPartData: string[] = [
    BodyPartEnum.CHEST,
    BodyPartEnum.BACK,
    BodyPartEnum.SHOULDERS,
    BodyPartEnum.ARMS,
    BodyPartEnum.ABS
].map((e) => convertEnumToLabel(capitalize(e)));

export const exerciseCategoryData: string[] = [
    ExerciseCategoryEnum.BARBELL,
    ExerciseCategoryEnum.DUMBBELL,
    ExerciseCategoryEnum.MACHINE,
    ExerciseCategoryEnum.KETTLEBELL,
    ExerciseCategoryEnum.BODYWEIGHT,
    ExerciseCategoryEnum.ASSISTED_BODYWEIGHT,
    ExerciseCategoryEnum.REPS_ONLY,
    ExerciseCategoryEnum.CARDIO,
    ExerciseCategoryEnum.DURATION,
    ExerciseCategoryEnum.OTHER
].map((e) => convertEnumToLabel(capitalize(e)));