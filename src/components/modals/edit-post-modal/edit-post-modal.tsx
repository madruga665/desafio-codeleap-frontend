'use client'

import { useActionState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { updatePostAction } from '@/src/app/actions/posts.actions'
import { Button } from '../../button/button'
import { InputField } from '../../inputs/input-field/input-field'
import { TextareaField } from '../../inputs/textarea-field/textarea-field'

const editSchema = z.object({
  title: z.string().min(1, 'O título não pode estar vazio'),
  content: z.string().min(1, 'O conteúdo não pode estar vazio'),
})

type EditFormData = z.infer<typeof editSchema>

interface EditPostModalProps {
  postId: number
  initialValues: EditFormData
}

export function EditPostModal({ postId, initialValues }: EditPostModalProps) {
  const router = useRouter()
  const dialogRef = useRef<HTMLDialogElement>(null)

  const updateActionWithId = updatePostAction.bind(null, postId)
  const [state, action, isPending] = useActionState(updateActionWithId, null)

  const {
    register,
    setError,
    formState: { errors, isValid }
  } = useForm<EditFormData>({
    resolver: zodResolver(editSchema),
    defaultValues: initialValues,
    mode: 'onChange'
  })

  useEffect(() => {
    dialogRef.current?.showModal()
  }, [])

  useEffect(() => {
    if (state?.success) {
      router.back()
    }

    if (state?.errors?.properties) {
      Object.entries(state.errors.properties).forEach(([field, errorData]) => {
        const message = (errorData).errors?.[0]
        if (message) {
          setError(field as keyof EditFormData, {
            type: 'server',
            message
          })
        }
      })
    }
  }, [state, router, setError])

  const handleClose = () => {
    router.back()
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      className="fixed inset-0 z-50 m-0 flex h-full w-full max-w-none items-center justify-center bg-transparent p-0 backdrop:bg-[#777777]/80"
    >
      <div className="bg-white p-6 rounded-2xl w-[90%] max-w-165 shadow-lg flex flex-col gap-6">
        <h2 className="text-xl font-bold text-black">Edit item</h2>

        <form action={action} className="flex flex-col">
          <InputField
            label="Title"
            id="title"
            placeholder="Hello world"
            {...register('title')}
          />
          {errors.title && (
            <span className="text-red-500 text-[12px] block mb-4 -mt-2">
              {errors.title.message}
            </span>
          )}

          <TextareaField
            id="content"
            label="Content"
            placeholder="Content here"
            {...register('content')}
          />
          {errors.content && (
            <span className="text-red-500 text-[12px] block mb-4 -mt-2">
              {errors.content.message}
            </span>
          )}

          {state?.message && !state.success && (
            <p className="text-red-500 text-sm mb-4 font-bold">{state.message}</p>
          )}

          <div className="flex justify-end gap-4 mt-2">
            <Button
              variant="outline"
              type="button"
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              variant="success"
              type="submit"
              disabled={isPending || !isValid}
              isLoading={isPending}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </dialog>
  )
}
