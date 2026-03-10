import { fetchAdapter } from '../lib/fetchAdapter';

type Post = {
  id?: number;
  username: string;
  created_datetime: string;
  title: string;
  content: string;
};

export async function getAllPostsRepository() {
  const data = await fetchAdapter<Post>({ url: '/posts', options: { method: 'GET' } });

  return data;
}
