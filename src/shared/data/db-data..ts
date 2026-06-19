// todo: need refactor since these were taken from realm db
export type BaseType = {
    _id?: string;
    createdAt: Date;
    updatedAt: Date;
}

export type UserType = BaseType & {
    name: string;
    email: string;
    measurements: MeasurementsType[]
    workOuts: WorkOutType[]
}

export type ExerciseType = BaseType & {
    name: string;
    imageUrl?: string;
    description?: string;
    majorMuscleHit?: BodyPartEnum;
    musclesTargeting?: Array<BodyPartEnum>;
    exerciseRecords?: ExerciseRecordType[]
    exerciseCategory?: ExerciseCategoryEnum;
}

export type ExerciseRecordType = BaseType & {
    exercise: ExerciseType;
    recordType: ExerciseRecordEnum
    set: SetsType
    measurement: number;
    unit: string;
    user: UserType;
}

export type WorkOutType = BaseType & {
    title: string;
    notes: string;
    workOutItems: WorkOutItemType[]
    isFinished: boolean;
    user: UserType;
    finishedAt: Date;
}

export type WorkOutTemplateType = WorkOutType & {
    title: string;
    notes: string;
    workOutItems: WorkOutItemTemplateType[]
    user: UserType;
};

export type WorkOutItemTemplateType = BaseType & {
    exercise: ExerciseType;
    numberOfSets: number;
}

export type WorkOutItemType = BaseType & {
    sets: SetsType[];
    exercise: ExerciseType;
    numberOfSets: number;
    workout: WorkOutType;
    isDone: boolean;
    notes: string;
}

export type SetsType = BaseType & {
    exercise: ExerciseType;
    rpe: number | null
    setType: SetTypeEnum;
    weight: number | null;
    reps: number | null;
    restTimmer: number;
    isDone: boolean;
    workoutItem: WorkOutItemType
}

export type MeasurementsType = BaseType & {
    user: UserType;
    bodyPart: BodyPartEnum;
    measurement: string;
    unit: string;
}

export enum BodyPartEnum {
    ARMS = "ARMS",
    LEFT_BICEP = "LEFT_BICEP",
    RIGHT_BICEP = "RIGHT_BICEP",
    LEFT_THIGH = "LEFT_THIGH",
    RIGHT_THIGH = "RIGHT_THIGH",
    LEFT_CALF = "LEFT_CALF",
    RIGHT_CALF = "RIGHT_CALF",
    LEFT_FOREARM = "LEFT_FOREARM",
    RIGHT_FOREARM = "RIGHT_FOREARM",
    SHOULDERS = "SHOULDERS",
    BACK = "BACK",
    LATS = "LATS",
    TRAPS = "TRAPS",
    CHEST = "CHEST",
    ABS = "ABS"
}

export enum SetTypeEnum {
    NORMAL = "NORMAL",
    FALIURE = "FALIURE",
    DROPSET = "DROPSET",
    SUPER = "SUPER",
    LENGTHEND_PARTAL = "LENGTHEND_PARTAL"
}

export enum ExerciseRecordEnum {
    MAX_REPS = "MAX_REPS",
    MAX_WEIGHT = "MAX_WEIGHT",
    MAX_VOLUME = "MAX_VOLUME",
    MAX_SECONDS = "MAX_SECONDS",
}

export enum ExerciseCategoryEnum {
    BARBELL = "BARBELL",
    DUMBBELL = "DUMBBELL",
    MACHINE = "MACHINE",
    KETTLEBELL = "KETTLEBELL",
    BODYWEIGHT = "BODYWEIGHT",
    ASSISTED_BODYWEIGHT = "ASSISTED_BODYWEIGHT",
    REPS_ONLY = "REPS_ONLY",
    CARDIO = "CARDIO",
    DURATION = "DURATION",
    OTHER = "OTHER"
}