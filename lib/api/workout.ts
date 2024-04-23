import type { GyrnalWorkout, } from "@/lib/entities/gyrnal_workout"
import { useToast, } from "~/components/ui/toast"

export const insertWorkout = async (gyrnalWorkout: GyrnalWorkout) => {
    const router = useRouter()
    const supabase = useSupabaseClient()
    const { toast, } = useToast()

    const { data, error, } = await supabase.from('gyrnal_workout').insert(gyrnalWorkout).select().single()

    if (error) {
        toast({
            title: 'Error saving workout',
            description: error.message,
            variant: 'destructive',
        })
    } else {
        toast({
            title: 'Workout saved',
            variant: 'success',
        })

        if (data && data.id) {
            router.push(`/workouts/${data.id}`)
        } else {
            router.push('/')
        }
    }

    return { data, error, }
}
