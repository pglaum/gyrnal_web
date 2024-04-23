import { z, } from "zod"

import { MetadataSchema, } from "@/lib/entities/metadata"
import { MovementSchema, } from "@/lib/entities/movement"


export const WorkoutSchema = z.object({
    id: z.string().nullable().default(null),
    userId: z.string().nullable().default(null),
    startedAt: z.date().default(new Date()),
    finishedAt: z.date().default(new Date()),
    movements: z.array(MovementSchema).default([]),
    metadata: z.array(MetadataSchema).default([]),
    notes: z.array(z.string()).default([]),
})

export type Workout = z.infer<typeof WorkoutSchema>
