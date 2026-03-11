import prisma from '@/src/lib/prisma';
import { Post } from '@prisma/client';

export type FindAllOptions = {
  limit: number;
  offset: number;
};

export class PostsRepository {
  async findAll({ limit, offset }: FindAllOptions): Promise<Post[]> {
    return prisma.post.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        created_datetime: 'desc',
      },
    });
  }

  async countAll(): Promise<number> {
    return prisma.post.count();
  }

  async create(data: Omit<Post, 'id' | 'created_datetime'>): Promise<Post> {
    return prisma.post.create({
      data,
    });
  }

  async update(id: number, data: Partial<Omit<Post, 'id' | 'created_datetime'>>): Promise<Post> {
    return prisma.post.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.post.delete({
      where: { id },
    });
  }
}

export const postsRepository = new PostsRepository();
