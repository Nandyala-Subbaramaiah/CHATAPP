const API_BASE_URL = "http://127.0.0.1:8001";

export async function apiClient(
  endpoint,
  options = {}
) {
  const token = localStorage.getItem("access_token");

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,

      headers: {
        "Content-Type": "application/json",
        ...(token
          ? { Authorization: `Bearer ${token}` }
          : {}),
        ...options.headers,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `API Error: ${response.status}`
    );
  }

  return response.json();
}