import { z, } from "zod"

import { MovementSchema, } from "@/lib/entities/movement"


export const WorkoutSchema = z.object({
    id: z.string().nullable().default(null),
    userId: z.string().nullable().default(null),
    startedAt: z.date().default(new Date()),
    finishedAt: z.date().default(new Date()),
    movements: z.array(MovementSchema).default([]),
    metadata: z.object({}).default({}),
    notes: z.string().default(''),
})

export type Workout = z.infer<typeof WorkoutSchema>
