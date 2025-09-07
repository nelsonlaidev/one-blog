'use client'

import type { User } from '@/db/schema'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { buttonVariants } from './ui/button'
import UserAvatar from './user-avatar'

type MenuProps = {
  user: User | null
}

const Menu = (props: MenuProps) => {
  const { user } = props
  const pathname = usePathname()

  if (!user) {
    return (
      <Link href={`/login?redirect=${pathname}`} className={buttonVariants()}>
        Log in
      </Link>
    )
  }

  const { name, image, email, id } = user

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar width={40} height={40} src={image} alt={name} userId={id} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem className='flex-col items-start' asChild>
          <Link href={`/users/${id}`}>
            <div className='text-sm'>{name}</div>
            <div className='text-xs text-muted-foreground'>{email}</div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href='/me/posts'>Posts</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href='/me/settings'>Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Menu
