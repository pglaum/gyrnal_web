import {z, } from "zod"

import {PerformanceSchema, } from "@/lib/entities/performance"

export const MovementSchema = z.object({
    name: z.string().default('new'),
    metadata: z.object({}).default({}),
    notes: z.string().default(''),
    performances: z.array(PerformanceSchema).default([]),
    superset: z.boolean().default(false),
})

export type Movement = z.infer<typeof MovementSchema>
