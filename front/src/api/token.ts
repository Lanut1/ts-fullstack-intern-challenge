const AUTH_TOKEN_KEY = 'X-Auth-Token';
export function saveAuthToken(token: string): void { localStorage.setItem(AUTH_TOKEN_KEY, token); }
export function getAuthToken(): string | null { return localStorage.getItem(AUTH_TOKEN_KEY); }
export function removeAuthToken(): void { localStorage.removeItem(AUTH_TOKEN_KEY); }
