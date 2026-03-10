type FetchAdapterProps = {
  url: string;
  options: RequestInit;
};

export type ApiResponse<T> = {
  data: T | null;
  status: number;
  error: string | null;
};

export async function fetchAdapter<T>({
  url,
  options,
}: FetchAdapterProps): Promise<ApiResponse<T>> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${apiBaseUrl}${url}`, {
      cache: 'no-store',
      ...options,
      headers: {
        'Content-type': 'application/json',
        ...options.headers,
      },
    });

    const status = response.status;
    const text = await response.text();
    const data: T = text ? JSON.parse(text) : null;

    if (!response.ok) {
      return {
        data: null,
        status,
        error: `[fetchAdapter] - Erro ao buscar dados em ${url}, status: ${status}`,
      };
    }

    return { data, status, error: null };
  } catch (error) {
    console.error(`[fetchAdapter] - Erro ao buscar dados em ${url}:`, error);
    return {
      data: null,
      status: 500,
      error: `[fetchAdapter] - Erro ao buscar dados em ${url}: ${error}`,
    };
  }
}
