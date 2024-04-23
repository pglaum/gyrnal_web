import { z, } from "zod"

import { MovementSchema, } from "@/lib/entities/movement"

export const MetadataSchema = z.object({
    key: z.string(),
    value: z.string(),
})

export const WorkoutSchema = z.object({
    id: z.string().default('new'),
    userId: z.string().uuid().nullable(),
    startedAt: z.date().default(new Date()),
    finishedAt: z.date().default(new Date()),
    movements: z.array(MovementSchema).default([]),
    metadata: z.array(MetadataSchema).default([]),
    notes: z.array(z.string()),
})

export type Workout = z.infer<typeof WorkoutSchema>
