import prisma from '@/src/lib/prisma';
import { Post } from '@prisma/client';

export type FindAllOptions = {
  limit: number;
  offset: number;
};

export class PostsRepository {
  async findAll({ limit, offset }: FindAllOptions): Promise<Post[]> {
    return prisma.post.findMany({
      where: { deleted: false },
      take: limit,
      skip: offset,
      orderBy: {
        created_datetime: 'desc',
      },
    });
  }

  async countAll(): Promise<number> {
    return prisma.post.count({
      where: { deleted: false },
    });
  }

  async findById(id: number): Promise<Post | null> {
    return prisma.post.findFirst({
      where: { id, deleted: false },
    });
  }

  async create(data: Omit<Post, 'id' | 'created_datetime' | 'deleted'>): Promise<Post> {
    return prisma.post.create({
      data,
    });
  }

  async update(id: number, data: Partial<Omit<Post, 'id' | 'created_datetime' | 'deleted'>>): Promise<Post> {
    return prisma.post.update({
      where: { id, deleted: false },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.post.update({
      where: { id },
      data: { deleted: true },
    });
  }
}

export const postsRepository = new PostsRepository();
