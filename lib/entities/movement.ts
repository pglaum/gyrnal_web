import { z, } from "zod"

import { PerformanceSchema, } from "@/lib/entities/performance"
import { MetadataSchema, } from "@/lib/entities/workout"

export const MovementSchema = z.object({
    name: z.string().default('new'),
    metadata: z.array(MetadataSchema).default([]),
    notes: z.array(z.string()).default([]),
    performances: z.array(PerformanceSchema).default([]),
    superset: z.boolean().default(false),
})

export type Movement = z.infer<typeof MovementSchema>
