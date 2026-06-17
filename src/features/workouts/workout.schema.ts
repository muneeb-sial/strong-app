import { z } from "zod";

export const SetsSchema = z.object({
    exerciseId: z.string(),
    rpe: z.number().optional().nullable(),
    setType: z.string().optional().nullable(),
    weight: z.number().optional().nullable(),
    reps: z.number().optional().nullable(),
    restTimmer: z.number().optional().nullable(),
    isDone: z.boolean().optional().nullable(),
})

export const WorkOutItemSchema = z.object({
    exerciseId: z.string(),
    sets: z.array(SetsSchema).min(1),
    notes: z.string().optional().nullable(),
    isDone: z.boolean().optional().nullable(),
})

export const WorkOutItemTemplateSchema = z.object({
    exerciseId: z.string(),
    numberOfSets: z.number().optional().nullable(),
})

export const WorkoutSchema = z.object({
    title: z.string().min(3).max(100).optional().nullable(),
    notes: z.string().min(3).max(1000).optional().nullable(),
    workOutItems: z.array(WorkOutItemSchema).min(1),
    isFinished: z.boolean().optional().nullable(),
    finishedAt: z.any(),
})

export const WorkoutTemplateSchema = z.object({
    title: z.string().min(3).max(100).optional().nullable(),
    notes: z.string().min(3).max(1000).optional().nullable(),
    workOutItems: z.array(WorkOutItemTemplateSchema).min(1),
})

export type WorkoutSchemaType = z.infer<typeof WorkoutSchema>
export type WorkOutItemSchemaType = z.infer<typeof WorkOutItemSchema>
export type SetsSchemaType = z.infer<typeof SetsSchema>
export type WorkoutTemplateSchemaType = z.infer<typeof WorkoutTemplateSchema>
export type WorkOutItemTemplateSchemaType = z.infer<typeof WorkOutItemTemplateSchema>

// Form-specific type for template creation UI (uses full items with sets for UI management)
export type TemplateFormType = {
  title: string;
  notes: string;
  workOutItems: WorkOutItemTemplateSchemaType[];
}