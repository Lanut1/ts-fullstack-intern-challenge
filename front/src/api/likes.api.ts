import { getAuthToken } from "./token";

const BACKEND_URL = '/api';

function createAuthHeaders(): HeadersInit {
  const token = getAuthToken();
  if (!token) { throw new Error('Пользователь не аутентифицирован. Токен не найден.'); }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
}

export async function getLikedCats() {
  try {
    const response = await fetch(`${BACKEND_URL}/likes`, {
      method: 'GET',
      headers: createAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Не удалось получить список понравившихся котиков');
    }

    const result = await response.json();
    return result.data ?? [];
  } catch (error) {
    console.error('Ошибка в getLikedCats:', error);
    throw error;
  }
}

export async function addLike(catId: string) {
  try {
    const response = await fetch(`${BACKEND_URL}/likes`, {
      method: 'POST',
      headers: createAuthHeaders(),
      body: JSON.stringify({ cat_id: catId }),
    });

    if (!response.ok) {
      const errorText = await response.json();
      throw new Error(errorText || 'Не удалось добавить лайк');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Ошибка при добавлении лайка:', error);
    throw error;
  }
}

export async function removeLike(catId: string) {
  try {
    const response = await fetch(`${BACKEND_URL}/likes/${catId}`, {
      method: 'DELETE',
      headers: createAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Не удалось удалить лайк');
    }
    
    return { message: 'Лайк успешно удалён' };
  } catch (error) {
    console.error('Ошибка при удалении лайка:', error);
    throw error;
  }
}
