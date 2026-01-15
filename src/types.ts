export type ChecklistItem = {
  id: string
  text: string
  done: boolean
  createdAt: number
}

export type Checklist = {
  id: string
  name: string
  color: string
  createdAt: number
  items: ChecklistItem[]
}

