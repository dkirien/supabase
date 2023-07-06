export type Data = {
  count: number | null
  data: ObjectType[] | null
  error: {
    code: string
    details: string
    hint: string
    message: string
  } | null
  status: number
  statusText: string
}

export type User = {
  id: number
  name: string
  nickname: string
  last_name: string
  email: string
  role_id: number
  created_at?: string
}

export type Comment = {
  id: number
  text: string
  post_id: number
  user_id: number
  created_at?: string
}

export type Post = {
  id: number
  title: string
  description: string
  text: string
  user_id: number
  category_id: number
  created_at?: string
}

export type Role = {
  id: number
  name: string
  actions: string
}

export type Category = {
  id: number
  name: string
}

export type Like = {
  id: number
  user_id: number
  post_id: number
  status: boolean
  created_at?: string
}

export type View = {
  id: number
  post_id: number
  created_at?: string
}

export type DataSchema = {
  user: User,
  post: Post,
  comment: Comment,
  category: Category,
  like: Like,
  view: View
}

export type TableData = {
  titles: string[]
  colModifiers: colModifiersObj
  fields: ObjectType[] | null
}

export type SidebarProps = {
  active: string,
  onSelect: (name: string) => void
}

export type FormProps = {
  data: TableData,
  onSave: (data: any) => void
  onDelete: (id: number) => void
  onAdd: (data: any) => void
}

export type colModifiersObj = {
  [key: string]: {
    editable: boolean
    isTextarea: boolean
    isSelect: boolean
    data?: any
  }
}

export type ObjectType = { [key: string]: string }

