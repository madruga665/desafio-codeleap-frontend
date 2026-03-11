import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DeletePostModal } from './delete-post-modal';
import { useRouter } from 'next/navigation';
import { deletePostAction } from '@/src/app/actions/posts.actions';
import { useActionState } from 'react';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/src/app/actions/posts.actions', () => ({
  deletePostAction: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useActionState: jest.fn(),
}));

describe('DeletePostModal', () => {
  const mockBack = jest.fn();
  const mockAction = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ back: mockBack });
    (useActionState as jest.Mock).mockReturnValue([null, mockAction, false]);
    
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();
  });

  it('deve renderizar a pergunta de confirmação', () => {
    render(<DeletePostModal postId={1} />);
    expect(screen.getByText(/Are you sure you want to delete this item\?/i, { ignore: 'script, style' })).toBeInTheDocument();
  });

  it('deve chamar router.back() ao clicar em Cancel', () => {
    render(<DeletePostModal postId={1} />);
    fireEvent.click(screen.getByRole('button', { name: /Cancel/i, hidden: true }));
    expect(mockBack).toHaveBeenCalled();
  });

  it('deve chamar a action ao clicar em Delete', () => {
    render(<DeletePostModal postId={1} />);
    fireEvent.click(screen.getByRole('button', { name: /Delete/i, hidden: true }));
    expect(mockAction).toHaveBeenCalled();
  });

  it('deve fechar o modal e voltar ao receber sucesso da action', async () => {
    (useActionState as jest.Mock).mockReturnValue([{ success: true }, mockAction, false]);
    render(<DeletePostModal postId={1} />);
    
    await waitFor(() => {
      expect(mockBack).toHaveBeenCalled();
    });
  });
});
