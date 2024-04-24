import { z, } from "zod"

import { MovementSchema, } from "@/lib/entities/movement"

export const WorkoutMetadataSchema = z.object({
    workoutType: z.string().nullish(),
})

export type WorkoutMetadata = z.infer<typeof WorkoutMetadataSchema>

export const WorkoutSchema = z.object({
    startedAt: z.coerce.date().default(new Date()),
    finishedAt: z.coerce.date().default(new Date()),
    movements: z.array(MovementSchema).default([]),
    metadata: WorkoutMetadataSchema.default(WorkoutMetadataSchema.parse({})),
    notes: z.string().default(''),
})

export type Workout = z.infer<typeof WorkoutSchema>
