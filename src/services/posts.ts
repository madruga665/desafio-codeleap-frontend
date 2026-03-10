import { getAllPostsRepository } from '@/src/repositories/posts';
import { formatDistanceToNow } from 'date-fns';

type PostViewModel = {
  id: number;
  username: string;
  title: string;
  content: string;
  createdAt: string;
};

export async function getAllPostsService() {
  const posts = await getAllPostsRepository();

  const result: PostViewModel[] =
    posts.data?.map((item) => ({
      id: Number(item.id),
      username: item.username,
      title: item.title,
      content: item.content,
      createdAt: formatDistanceToNow(new Date(item.created_datetime), {
        addSuffix: true,
      }).replace('about ', ''),
    })) ?? [];

  return result;
}
