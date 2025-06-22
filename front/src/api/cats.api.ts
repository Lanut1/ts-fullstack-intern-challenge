import { Cat } from "../types";

const CATS_API_URL = import.meta.env.VITE_CATS_API_URL || 'https://api.thecatapi.com/v1';
const CATS_API_KEY = import.meta.env.VITE_CATS_API_KEY || '';

const headers: HeadersInit = {};
if (CATS_API_KEY) {
  headers['x-api-key'] = CATS_API_KEY;
}


export async function getAllCats(page: number, limit = 20): Promise<Cat[]> {
  const response = await fetch(`${CATS_API_URL}/images/search?limit=${limit}&page=${page}`, {
    headers,
  });

  if (!response.ok) throw new Error('Не удалось получить список котиков от TheCatAPI');
  const result = await response.json();
  return result;
}

// TheCatAPI не поддерживает batch запросы с множеством id,
// поэтому приходится делать отдельные запросы через Promise.all,
// что может привести к ошибке "Too many requests",
// но сейчас пока не добавляю задержки или ограничение запросов.
export async function getCatsByIds(catIds: string[]): Promise<Cat[]> {
  if (catIds.length === 0) return [];
  
  const requests = catIds.map((id) =>
    fetch(`${CATS_API_URL}/images/${id}`, { headers })
        .then((res) => {
            if (!res.ok) {
                console.error(`Не удалось получить котика с ID: ${id}. Возможно, он был удалён.`);
                return null;
            }
            return res.json();
        })
  );

  const results = await Promise.all(requests);

  return results.filter(cat => cat !== null);
}
