import { NextResponse } from 'next/server';
import { postsService } from '@/src/services/posts.service';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postId = parseInt(id);

  if (isNaN(postId)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const post = await postsService.updatePost(postId, {
      title: body.title,
      content: body.content,
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error(`[API Posts PATCH] Error for ID ${id}:`, error);
    return NextResponse.json({ error: 'Erro ao editar post' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postId = parseInt(id);

  if (isNaN(postId)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  try {
    await postsService.deletePost(postId);

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(`[API Posts DELETE] Error for ID ${id}:`, error);
    return NextResponse.json({ error: 'Erro ao deletar post' }, { status: 500 });
  }
}
