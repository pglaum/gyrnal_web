import { type GyrnalWorkout, GyrnalWorkoutSchema, } from "@/lib/entities/gyrnal_workout"
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

export const updateWorkout = async (gyrnalWorkout: GyrnalWorkout) => {
    const router = useRouter()
    const supabase = useSupabaseClient()
    const { toast, } = useToast()

    const { data, error, } = await supabase.from('gyrnal_workout').upsert(gyrnalWorkout).select().single()

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

export const getWorkout = async (id: string) => {
    const supabase = useSupabaseClient()
    const { toast, } = useToast()

    const { data, error, } = await supabase.from('gyrnal_workout').select().eq('id', id).single()

    if (error) {
        toast({
            title: `Error fetching workout [${id}]`,
            description: error.message,
            variant: 'destructive',
        })
        return null
    } else {
        return GyrnalWorkoutSchema.parse(data)
    }
}

export const getWorkouts = async () => {
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    const { toast, } = useToast()

    const { data, error, } = await supabase
        .from('gyrnal_workout')
        .select()
        .eq('userid', user.value.id)
        .order('data->>startedAt', { ascending: false, })

    if (error) {
        toast({
            title: 'Error fetching workouts',
            description: error.message,
            variant: 'destructive',
        })
        return []
    } else {
        return data.map((value) => GyrnalWorkoutSchema.parse(value))
    }
}

export const deleteWorkout = async (id: string) => {
    const router = useRouter()
    const supabase = useSupabaseClient()
    const { toast, } = useToast()

    const { error, } = await supabase.from('gyrnal_workout').delete().eq('id', id)

    if (error) {
        toast({
            title: `Error deleting workout [${id}]`,
            description: error.message,
            variant: 'destructive',
        })
    } else {
        router.push('/')
    }
}
