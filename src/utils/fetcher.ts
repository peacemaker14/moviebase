import mapToCamelCase from './caseConverter';

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const AUTH_TOKEN = import.meta.env.VITE_TMDB_AUTH_TOKEN;

export interface FetcherParams {
  endpoint: string;
  params?: Record<string, string | number>;
  options?: RequestInit;
}

export const fetcher = async <T>(params: FetcherParams): Promise<T> => {
  const { endpoint, params: queryParams = {}, options = {} } = params;

  const queryString = new URLSearchParams(
    Object.entries(queryParams).reduce(
      (acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      },
      {} as Record<string, string>
    )
  );

  const url = `${BASE_URL}${endpoint}?${queryString.toString()}`;

  const defaultHeaders: HeadersInit = {
    accept: 'application/json',
    Authorization: `Bearer ${AUTH_TOKEN}`,
  };

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.status_message || 'API request failed');
  }

  const data = await response.json();
  return mapToCamelCase<T>(data);
};
