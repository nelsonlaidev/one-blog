'use client'

import type { User } from '@/db/schema'

import { Loader2Icon, MoreVerticalIcon, PencilIcon, Share2Icon, Trash2Icon } from 'lucide-react'
import Link from 'next/link'
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'
import { toast } from 'sonner'

import { deletePostAction } from '@/actions/delete-post-action'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { SITE_URL } from '@/lib/constants'
import { copyUrl } from '@/utils/copy-url'

import { AlertDialogFooter, AlertDialogHeader } from './ui/alert-dialog'
import { Button, buttonVariants } from './ui/button'

type ControlsProps = {
  id: string
  user: User | null
  authorId: string
  postTitle: string
}

const Controls = (props: ControlsProps) => {
  const { id, user, authorId, postTitle } = props
  const [isOpen, setIsOpen] = useState(false)
  const action = useAction(deletePostAction, {
    onSuccess: () => {
      toast.success('Post deleted')
    },
    onError: ({ error }) => {
      toast.error(error.serverError)
    }
  })

  const handleDelete = async () => {
    await action.executeAsync({ postId: id })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon' className='shrink-0'>
            <MoreVerticalIcon className='size-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={() => copyUrl(`${SITE_URL}/posts/${id}`)}>
            <Share2Icon className='mr-2 size-4' />
            Share
          </DropdownMenuItem>
          {user && user.id === authorId && (
            <>
              <DropdownMenuItem asChild>
                <Link href={`/editor/${id}`}>
                  <PencilIcon className='mr-2 size-4' />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setIsOpen(true)
                }}
              >
                <Trash2Icon className='mr-2 size-4' />
                Delete
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              &quot;{postTitle}&quot; will be permanently deleted. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={action.isExecuting}
              className={buttonVariants({
                variant: 'destructive'
              })}
            >
              {action.isExecuting ? <Loader2Icon className='mr-2 size-4 animate-spin' /> : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default Controls
