import { formatDistanceToNow, formatISO } from 'date-fns';
import { postsRepository } from '../repositories/posts.repository';

export class PostsService {
  async getPaginatedPosts(limit: number, offset: number, baseUrl: string) {
    const [count, results] = await Promise.all([
      postsRepository.countAll(),
      postsRepository.findAll({ limit, offset }),
    ]);

    const nextOffset = offset + limit;
    const prevOffset = offset - limit;

    const next = nextOffset < count ? `${baseUrl}?limit=${limit}&offset=${nextOffset}` : null;
    const previous =
      offset > 0 ? `${baseUrl}?limit=${limit}&offset=${Math.max(0, prevOffset)}` : null;

    const posts = results.map((item) => ({
      ...item,
      createdAt: formatDistanceToNow(formatISO(item.created_datetime), { addSuffix: true }).replace(
        'about',
        '',
      ),
    }));

    return {
      count,
      next,
      previous,
      posts,
    };
  }

  async getPostById(id: number) {
    return postsRepository.findById(id);
  }

  async createPost(data: { username: string; title: string; content: string }) {
    return postsRepository.create(data);
  }

  async updatePost(id: number, data: { title?: string; content?: string }) {
    return postsRepository.update(id, data);
  }

  async deletePost(id: number) {
    return postsRepository.delete(id);
  }
}

export const postsService = new PostsService();
