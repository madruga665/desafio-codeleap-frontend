import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { PostForm } from './post-form'

jest.mock('@/src/app/actions/posts.actions', () => ({
  createPostAction: jest.fn(),
}))

jest.mock('@/src/hooks/use-username', () => ({
  useUsername: () => ({ username: 'test-user', saveUsername: jest.fn() }),
}))

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useActionState: jest.fn((action) => [null, action, false]),
}))

describe('PostForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('deve renderizar os campos de título e conteúdo corretamente', () => {
    render(<PostForm />)

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Content/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Create/i })).toBeInTheDocument()
  })

  it('o botão Create deve iniciar desabilitado quando o formulário está vazio', () => {
    render(<PostForm />)

    const submitButton = screen.getByRole('button', { name: /Create/i })
    expect(submitButton).toBeDisabled()
  })

  it('deve habilitar o botão quando os campos obrigatórios forem preenchidos', async () => {
    render(<PostForm />)

    const titleInput = screen.getByLabelText(/Title/i)
    const contentInput = screen.getByLabelText(/Content/i)
    const submitButton = screen.getByRole('button', { name: /Create/i })

    fireEvent.change(titleInput, { target: { value: 'Meu Post' } })
    fireEvent.change(contentInput, { target: { value: 'Conteúdo legal.' } })

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled()
    })
  })

  it('deve desabilitar o botão se o conteúdo for removido', async () => {
    render(<PostForm />)

    const titleInput = screen.getByLabelText(/Title/i)
    const contentInput = screen.getByLabelText(/Content/i)
    const submitButton = screen.getByRole('button', { name: /Create/i })

    fireEvent.change(titleInput, { target: { value: 'Título' } })
    fireEvent.change(contentInput, { target: { value: 'Conteúdo' } })

    await waitFor(() => expect(submitButton).not.toBeDisabled())

    fireEvent.change(contentInput, { target: { value: '' } })

    await waitFor(() => expect(submitButton).toBeDisabled())
  })
})
