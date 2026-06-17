import { z } from "zod";

export const MeasurementZodSchema = z.object({
    bodyPart: z.string(),
    measurement: z.string(),
    unit: z.string(),
});

export type MeasurementZodSchemaType = z.infer<typeof MeasurementZodSchema>;
