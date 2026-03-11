'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { postsService } from '@/src/services/posts.service';

const postSchema = z.object({
  username: z.string().min(1, 'Username é obrigatório'),
  title: z.string().min(1, 'O título não pode estar vazio'),
  content: z.string().min(1, 'O conteúdo não pode estar vazio'),
});

export async function createPostAction(_state: unknown, formData: FormData) {
  const data = {
    username: formData.get('username') as string,
    title: formData.get('title') as string,
    content: formData.get('content') as string,
  };

  const validatedFields = postSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      errors: z.treeifyError(validatedFields.error),
      message: 'Verifique os campos do formulário.',
    };
  }

  try {
    await postsService.createPost(validatedFields.data);
    revalidatePath('/home');

    return { success: true, message: 'Post criado com sucesso!' };
  } catch (error) {
    console.error('[createPostAction] Error:', error);
    return { message: 'Ocorreu um erro no servidor ao salvar o post.' };
  }
}

export async function updatePostAction(id: number, _state: unknown, formData: FormData) {
  const data = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
  };

  const editSchema = z.object({
    title: z.string().min(1, 'O título não pode estar vazio'),
    content: z.string().min(1, 'O conteúdo não pode estar vazio'),
  });

  const validatedFields = editSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      errors: z.treeifyError(validatedFields.error),
      message: 'Verifique os campos do formulário.',
    };
  }

  try {
    await postsService.updatePost(id, validatedFields.data);
    revalidatePath('/home');
    return { success: true, message: 'Post atualizado com sucesso!' };
  } catch (error) {
    console.error('[updatePostAction] Error:', error);
    return { message: 'Erro ao atualizar o post.' };
  }
}

export async function deletePostAction(id: number) {
  try {
    await postsService.deletePost(id);
    revalidatePath('/home');
    return { success: true };
  } catch (error) {
    console.error('[deletePostAction] Error:', error);
    return { message: 'Erro ao deletar o post.' };
  }
}
