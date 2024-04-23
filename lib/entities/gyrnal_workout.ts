import { z, } from "zod"

import { WorkoutSchema, } from "@/lib/entities/workout"


export const GyrnalWorkoutSchema = z.object({
    id: z.string().nullish(),
    userid: z.string().nullable().default(null),
    data: WorkoutSchema.default(WorkoutSchema.parse({})),
})

export type GyrnalWorkout = z.infer<typeof GyrnalWorkoutSchema>
