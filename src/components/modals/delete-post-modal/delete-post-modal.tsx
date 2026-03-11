'use client'

import { useActionState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { deletePostAction } from '@/src/app/actions/posts.actions'
import { Button } from '../../button/button'


interface DeletePostModalProps {
  postId: number
}

export function DeletePostModal({ postId }: DeletePostModalProps) {
  const router = useRouter()
  const dialogRef = useRef<HTMLDialogElement>(null)


  const [state, action, isPending] = useActionState(
    async () => deletePostAction(postId),
    null
  )

  useEffect(() => {
    dialogRef.current?.showModal()
  }, [])

  useEffect(() => {
    if (state?.success) {
      router.back()
    }
  }, [state, router])

  const handleClose = () => {
    router.back()
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      className="z-50 flex items-center justify-center w-full h-full bg-transparent backdrop:bg-[#777777]/80"
    >
      <div className="bg-white p-6 rounded-2xl w-[90%] max-w-165 shadow-lg flex flex-col gap-10">
        <h2 className="text-xl font-bold text-black">
          Are you sure you want to delete this item?
        </h2>

        {state?.message && (
          <p className="text-red-500 text-sm font-bold">{state.message}</p>
        )}

        <form action={action} className="flex justify-end gap-4">
          <Button
            variant="outline"
            type="button"
            onClick={handleClose}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            type="submit"
            disabled={isPending}
            isLoading={isPending}
          >
            Delete
          </Button>
        </form>
      </div>
    </dialog>
  )
}
