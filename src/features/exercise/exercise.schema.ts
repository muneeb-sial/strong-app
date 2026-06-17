import { z } from "zod";

export const ExerciseZodSchema = z.object({
    name: z.string(),
    imageUrl: z.string().optional(),
    description: z.string().optional(),
    majorMuscleHit: z.string(),
    exerciseCategory: z.string(),
    musclesTargeting: z.array(z.string()).optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export type ExerciseZodSchemaType = z.infer<typeof ExerciseZodSchema>;
