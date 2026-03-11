import { NextResponse } from 'next/server';
import { postsService } from '@/src/services/posts.service';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const limit = parseInt(searchParams.get('limit') || '10');
  const offset = parseInt(searchParams.get('offset') || '0');
  const protocol = request.headers.get('x-forwarded-proto') || 'http';
  const host = request.headers.get('host');
  const baseUrl = `${protocol}://${host}/api/posts`;

  try {
    const data = await postsService.getPaginatedPosts(limit, offset, baseUrl);
    return NextResponse.json(data);
  } catch (error) {
    console.error('[API Posts GET] Error:', error);
    return NextResponse.json({ error: 'Erro ao buscar posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.username || !body.title || !body.content) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: username, title, content' },
        { status: 400 },
      );
    }

    const post = await postsService.createPost({
      username: body.username,
      title: body.title,
      content: body.content,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('[API Posts POST] Error:', error);
    return NextResponse.json({ error: 'Erro ao criar post' }, { status: 500 });
  }
}
