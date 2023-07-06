import { colModifiersObj, DataSchema } from '@/types'

export const TITLES: {[key: string]: string[]} = {
  user: ['ID', 'Name', 'Last Name', 'Nickname', 'Email', 'Role'],
  post: ['ID', 'Title', 'Description', 'Text', 'Username', 'Category'],
  comment: ['ID', 'Text', 'Post ID', 'User'],
  category: ['ID', 'Name'],
  like: ['ID', 'User', 'Post ID', 'Status'],
  view: ['ID', 'Post ID'],
}

export const DATA_SCHEMA: DataSchema = {
  user: {
    id: 0,
    name: '',
    last_name: '',
    nickname: '',
    email: '',
    role_id: 0
  },
  post: {
    id: 0,
    title: '',
    description: '',
    text: '',
    user_id: 0,
    category_id: 0
  },
  comment: {
    id: 0,
    text: '',
    post_id: 0,
    user_id: 0,
  },
  category: {
    id: 0,
    name: '',
  },
  like: {
    id: 0,
    user_id: 0,
    post_id: 0,
    status: true
  },
  view: {
    id: 0,
    post_id: 0
  }
}

export const DATA_FETCHING: any = {
  user: [
    {
      table: 'user',
    },
    {
      table: 'role',
      to: 'role_id'
    }
  ],
  post: [
    {
      table: 'post',
    },
    {
      table: 'user',
      to: 'user_id'
    },
    {
      table: 'category',
      to: 'category_id'
    },
  ],
  comment: [
    {
      table: 'comment',
    },
    {
      table: 'user',
      to: 'user_id'
    },
    {
      table: 'post',
      to: 'post_id'
    },
  ],
  category: [
    {
      table: 'category',
    }
  ],
  like: [
    {
      table: 'like',
    },
    {
      table: 'user',
      to: 'user_id'
    },
    {
      table: 'post',
      to: 'post_id'
    },
  ],
  view: [
    {
      table: 'view',
    },
    {
      table: 'post',
      to: 'post_id'
    },
  ],
}

export const MODIFIERS: {[key: string]: colModifiersObj} = {
  user: {
    id: {
      editable: false,
      isTextarea: false,
      isSelect: false,
    },
    name: {
      editable: true,
      isTextarea: false,
      isSelect: false,
    },
    'last_name': {
      editable: true,
      isTextarea: false,
      isSelect: false,
    },
    nickname: {
      editable: true,
      isTextarea: false,
      isSelect: false,
    },
    email: {
      editable: true,
      isTextarea: false,
      isSelect: false,
    },
    'role_id': {
      editable: true,
      isTextarea: false,
      isSelect: true,
      data: []
    }
  },
  post: {
    id: {
      editable: false,
      isTextarea: false,
      isSelect: false,
    },
    title: {
      editable: true,
      isTextarea: true,
      isSelect: false,
    },
    description: {
      editable: true,
      isTextarea: true,
      isSelect: false,
    },
    text: {
      editable: true,
      isTextarea: true,
      isSelect: false,
    },
    'user_id': {
      editable: true,
      isTextarea: false,
      isSelect: true,
      data: []
    },
    'category_id': {
      editable: true,
      isTextarea: false,
      isSelect: true,
      data: []
    }
  },
  comment: {
    id: {
      editable: false,
      isTextarea: false,
      isSelect: false,
    },
    text: {
      editable: true,
      isTextarea: true,
      isSelect: false,
    },
    'post_id': {
      editable: true,
      isTextarea: false,
      isSelect: true,
    },
    'user_id': {
      editable: true,
      isTextarea: false,
      isSelect: true,
    },
  },
  category: {
    id: {
      editable: false,
      isTextarea: false,
      isSelect: false,
    },
    name: {
      editable: true,
      isTextarea: false,
      isSelect: false,
    },
  },
  like: {
    id: {
      editable: false,
      isTextarea: false,
      isSelect: false,
    },
    'user_id': {
      editable: true,
      isTextarea: false,
      isSelect: true,
    },
    'post_id': {
      editable: true,
      isTextarea: false,
      isSelect: true,
    },
    status: {
      editable: true,
      isTextarea: false,
      isSelect: true,
      data: [
        { id: 'true' },
        { id: 'false' }
      ]
    },
  },
  view: {
    id: {
      editable: false,
      isTextarea: false,
      isSelect: false,
    },
    'post_id': {
      editable: true,
      isTextarea: false,
      isSelect: true,
    },
  }
}
