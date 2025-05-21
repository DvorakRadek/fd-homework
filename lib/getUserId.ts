import { cookies } from 'next/headers';

export async function getUserId() {
  const cookieStore = cookies();
  return (await cookieStore).get('userId')?.value;
}