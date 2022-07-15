type Tag = {
  id: number
  label: string
}

type CreateHookFormValues = {
  id: number
  name: string
  notes: string
  description: string
  code: string
  related: string
  tags: Tag[]
  language: string
}

type RelatedHook = {
  id: number
  name: string
}

type Tags = Tag[]
type RelatedHooks = RelatedHook[]

export type { CreateHookFormValues, Tag, Tags, RelatedHook, RelatedHooks }
