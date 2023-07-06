import React, { FC } from 'react'
import { SidebarProps } from '../types'

const Sidebar: FC<SidebarProps> = ({active, onSelect}) => {
  return (
    <div className={'sidebar'}>
      <ul>
        <li
          className={active === 'user' ? 'active' : ''}
          onClick={() => onSelect('user')}
        >
          Users
        </li>

        <li
          className={active === 'post' ? 'active' : ''}
          onClick={() => onSelect('post')}
        >
          Posts
        </li>

        <li
          className={active === 'comment' ? 'active' : ''}
          onClick={() => onSelect('comment')}
        >
          Comments
        </li>

        <li
          className={active === 'category' ? 'active' : ''}
          onClick={() => onSelect('category')}
        >
          Categories
        </li>

        <li
          className={active === 'like' ? 'active' : ''}
          onClick={() => onSelect('like')}
        >
          Likes
        </li>

        <li
          className={active === 'view' ? 'active' : ''}
          onClick={() => onSelect('view')}
        >
          Views
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
