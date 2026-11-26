const API_BASE_URL = (import.meta.env.VITE_API_URL || '  https://demo-backend-tx4b.onrender.com/api').replace(/\/+$/, '');
const TOKEN_STORAGE_KEY = 'naira_auth_token';

export const getAuthToken = () => localStorage.getItem(TOKEN_STORAGE_KEY);

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
};

export const clearAuthToken = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};

export async function apiRequest(endpoint, options = {}) {
  const { method = 'GET', body, headers = {}, skipAuth = false } = options;
  const token = getAuthToken();

  const requestHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };

  if (!skipAuth && token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: requestHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  let payload = null;
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    payload = await response.json();
  } else {
    const text = await response.text();
    payload = { message: text };
  }

  if (!response.ok) {
    if (response.status === 401 && !skipAuth) {
      clearAuthToken();
      window.dispatchEvent(new CustomEvent('naira:unauthorized'));
    }
    const errMsg =
      payload?.message ||
      (Array.isArray(payload?.errors) && payload.errors[0]?.msg) ||
      `Request failed with status ${response.status}`;
    const error = new Error(errMsg);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}

export { API_BASE_URL };
