<template>
    <NuxtLink :to="`/templates/${template.id}`">
        <Card class="transition-shadow hover:shadow-md">
            <CardHeader>
                <CardTitle>{{ template.title }}</CardTitle>
                <CardDescription />
            </CardHeader>
            <CardContent>
                <div class="grid gap-4">
                    <div>
                        <Badge v-if="template.workoutType">
                            <Dumbbell class="size-4" />
                            {{ template.workoutType }}
                        </Badge>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <Badge
                            v-for="mvmnt, index in template.movements"
                            :key="index"
                            variant="outline"
                        >
                            {{ mvmnt }}
                        </Badge>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <div class="flex w-full items-end justify-end gap-2">
                    <Button as-child>
                        <NuxtLink
                            :to="`/templates/${template.id}`"
                            class="inline-flex items-center gap-2"
                        >
                            <Pencil class="size-4" />
                            Edit template
                        </NuxtLink>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    </NuxtLink>
</template>

<script setup lang="ts">
import { Dumbbell, Pencil, } from 'lucide-vue-next'

import { type Template, } from '~/lib/entities/template'

defineProps<{
    template: Template
}>()
</script>
