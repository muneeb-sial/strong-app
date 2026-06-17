import { BodyPartEnum } from "@/db/schema.type";
import { capitalize, convertEnumToLabel } from "../utils";

export const measurementBodyPartData: string[] = [
    "WEIGHT",
    "BODY_FAT",
    "HEIGHT",
    BodyPartEnum.CHEST,
    BodyPartEnum.BACK,
    BodyPartEnum.SHOULDERS,
    BodyPartEnum.LEFT_BICEP,
    BodyPartEnum.RIGHT_BICEP,
    BodyPartEnum.LEFT_THIGH,
    BodyPartEnum.RIGHT_THIGH,
    BodyPartEnum.LEFT_FOREARM,
    BodyPartEnum.RIGHT_FOREARM,
    BodyPartEnum.LEFT_CALF,
    BodyPartEnum.RIGHT_CALF,
    BodyPartEnum.ABS,
].map((e) => convertEnumToLabel(capitalize(e)));