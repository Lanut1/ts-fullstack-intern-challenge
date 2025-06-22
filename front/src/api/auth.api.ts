import { User } from '../types';
import { removeAuthToken, saveAuthToken } from './token';

const BACKEND_URL = '/api';

export async function authenticateUser(login: string, password: string): Promise<User> {
  const response = await fetch(`${BACKEND_URL}/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: login, password: password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage = errorData?.message || 'Ошибка аутентификации';
    throw new Error(errorMessage);
  }

  const token = response.headers.get('X-Auth-Token');
  if (token) {
    saveAuthToken(token);
  } else {
    console.warn('Сервер не предоставил заголовок X-Auth-Token.');
  }

  return response.json();
}


export function logoutUser(): void {
  removeAuthToken();
}
