'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useActionState, useEffect } from 'react'
import { createPostAction } from '@/src/app/actions/posts.actions'
import { useUsername } from '@/src/hooks/use-username'
import { Button } from '../button/button'
import { InputField } from '../inputs/input-field/input-field'
import { TextareaField } from '../inputs/textarea-field/textarea-field'

const postSchema = z.object({
  title: z.string().min(1, 'O título não pode estar vazio'),
  content: z.string().min(1, 'O conteúdo não pode estar vazio'),
})

type PostFormData = z.infer<typeof postSchema>

export function PostForm() {
  const { username } = useUsername()
  const [state, action, isPending] = useActionState(createPostAction, null)

  const {
    register,
    reset,
    formState: { errors, isValid }
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    mode: 'onChange'
  })

  useEffect(() => {
    if (state?.success) {
      reset()
    }
  }, [state, reset])

  return (
    <form action={action}>
      <input type="hidden" name="username" value={username ?? ''} />
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

      <div className="flex flex-row justify-end w-full">
        <Button
          variant="primary"
          type="submit"
          disabled={isPending || !isValid}
          isLoading={isPending}
        >
          {isPending ? 'Creating...' : 'Create'}
        </Button>
      </div>
    </form>
  )
}
