import { type Template, TemplateSchema, } from "@/lib/entities/template"
import { useToast, } from "~/components/ui/toast"


export const insertTemplate = async (template: Template) => {
    const router = useRouter()
    const supabase = useSupabaseClient()
    const { toast, } = useToast()

    const { data, error, } = await supabase.from('template').insert(template).select().single()

    if (error) {
        toast({
            title: 'Error saving template',
            description: error.message,
            variant: 'destructive',
        })
    } else {
        toast({
            title: 'Template saved',
            variant: 'success',
        })

        if (data && data.id) {
            router.push(`/templates/${data.id}`)
        } else {
            router.push('/')
        }
    }

    return { data, error, }
}

export const updateTemplate = async (template: Template) => {
    const router = useRouter()
    const supabase = useSupabaseClient()
    const { toast, } = useToast()

    const { data, error, } = await supabase.from('template').upsert(template).select().single()

    if (error) {
        toast({
            title: 'Error saving template',
            description: error.message,
            variant: 'destructive',
        })
    } else {
        toast({
            title: 'Template saved',
            variant: 'success',
        })

        if (data && data.id) {
            router.push(`/templates/${data.id}`)
        } else {
            router.push('/')
        }
    }

    return { data, error, }
}

export const getTemplate = async (id: string) => {
    const supabase = useSupabaseClient()
    const { toast, } = useToast()

    const { data, error, } = await supabase.from('template').select().eq('id', id).single()

    if (error) {
        toast({
            title: `Error fetching template [${id}]`,
            description: error.message,
            variant: 'destructive',
        })
        return null
    } else {
        return TemplateSchema.parse(data)
    }
}

export const getTemplates = async () => {
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    const { toast, } = useToast()

    const { data, error, } = await supabase.from('template').select().eq('userid', user.value.id)

    if (error) {
        toast({
            title: 'Error fetching templates',
            description: error.message,
            variant: 'destructive',
        })
        return []
    } else {
        return data.map((value) => TemplateSchema.parse(value))
    }
}

export const deleteTemplate = async (id: string) => {
    const router = useRouter()
    const supabase = useSupabaseClient()
    const { toast, } = useToast()

    const { error, } = await supabase.from('template').delete().eq('id', id)

    if (error) {
        toast({
            title: `Error deleting template [${id}]`,
            description: error.message,
            variant: 'destructive',
        })
    } else {
        router.push('/')
    }
}
