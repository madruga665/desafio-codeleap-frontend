import { deletePostAction } from './posts.actions';
import { postsService } from '@/src/services/posts.service';
import { revalidatePath } from 'next/cache';

jest.mock('@/src/services/posts.service', () => ({
  postsService: {
    deletePost: jest.fn(),
  },
}));

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

describe('deletePostAction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve deletar um post e revalidar a rota /home com sucesso', async () => {
    (postsService.deletePost as jest.Mock).mockResolvedValue(undefined);

    const result = await deletePostAction(1);

    expect(postsService.deletePost).toHaveBeenCalledWith(1);
    expect(revalidatePath).toHaveBeenCalledWith('/home');
    expect(result).toEqual({ success: true });
  });

  it('deve retornar uma mensagem de erro se o service falhar', async () => {
    (postsService.deletePost as jest.Mock).mockRejectedValue(new Error('DB Error'));

    const result = await deletePostAction(1);

    expect(result).toEqual({ message: 'Erro ao deletar o post.' });
    expect(revalidatePath).not.toHaveBeenCalled();
  });
});
