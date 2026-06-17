import { BodyPartEnum, ExerciseCategoryEnum } from "@/db/schema.type";
import { capitalize, convertEnumToLabel } from "../utils";

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