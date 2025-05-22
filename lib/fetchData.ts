import { url } from "../common/constants";

type FetchOpts = {
  method: 'POST' | 'PATCH' | 'DELETE',
  body: object,
}

export const fetchData = async (endpoint: string, { method, body }: Partial<FetchOpts> = {}) => {
  const fetchOpts: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(url + endpoint, fetchOpts);
  if (!response.ok) {
    throw new Error('Fetch error - ' + response.statusText);
  }
  const data = await response.json();
  return data;
};