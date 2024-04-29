<template>
    <GDialog>
        <template #title>
            Create a template
        </template>
        <template #body>
            <div class="grid gap-4">
                <TextInput
                    v-model="template.title"
                    label="Title"
                />

                <Card>
                    <CardHeader>
                        <CardTitle class="text-xl font-medium">
                            Movements
                        </CardTitle>
                    </CardHeader>
                    <CardContent class="grid gap-4">
                        <draggable
                            :animation="200"
                            :component-data="{
                                type: 'transition-group',
                                name: !dragging ? 'flip-list' : null,
                            }"
                            group="movements"
                            ghost-class="bg-muted"
                            handle=".handle"
                            tag="transition-group"
                            :list="template.movements"
                            @start="dragging = true"
                            @end="dragging = false"
                        >
                            <div
                                v-for="_, index in template.movements"
                                :key="index"
                                class="flex items-end gap-2 py-2"
                            >
                                <div
                                    class="handle
                                        cursor-move
                                        rounded
                                        p-2
                                        hover:bg-muted"
                                    title="Drag & drop movements"
                                >
                                    <GripVertical class="size-4" />
                                </div>
                                <TextInput
                                    v-model="template.movements[index]"
                                    :label="`Movement ${index}`"
                                />
                                <Button
                                    variant="destructive-outline"
                                    size="icon"
                                    class="shrink-0"
                                    @click="template.movements.splice(index, 1)"
                                >
                                    <Trash2 class="size-4" />
                                </Button>
                            </div>
                        </draggable>
                        <Button
                            variant="outline"
                            @click="template.movements.push('')"
                        >
                            <Plus class="size-4" />
                            Add movement
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </template>
        <template #footer>
            <Button
                variant="outline"
                @click="dialogStore.closeDialog()"
            >
                Cancel
            </Button>
            <Button @click="create()">
                Create
            </Button>
        </template>
    </GDialog>
</template>

<script setup lang="ts">

import { GripVertical, Plus, Trash2, } from 'lucide-vue-next'

import { insertTemplate, } from '~/lib/api/template'
import type { GyrnalWorkout, } from '~/lib/entities/gyrnal_workout'
import type { Movement, } from '~/lib/entities/movement'
import { type Template, TemplateSchema, } from '~/lib/entities/template'

const user = useSupabaseUser()
const dialogStore = useDialogStore()
const { dialogData: workout, }: {dialogData: Ref<GyrnalWorkout>} = storeToRefs(dialogStore)

const dragging = ref(false)
const template = ref<Template>(TemplateSchema.parse({}))

const create = () => {
    template.value.movements = template.value.movements.filter((mvmt) => !!mvmt)
    template.value.userid = user.value?.id || null
    template.value = TemplateSchema.parse(template.value)
    insertTemplate(template.value)
    dialogStore.closeDialog()
}

onMounted(() => {
    if (workout.value && workout.value.data?.movements) {
        const mvmnts: string[] = []
        workout.value.data.movements.forEach((movement: Movement) => {
            mvmnts.push(movement.name)
        })
        template.value.movements = mvmnts
    }
})
</script>
