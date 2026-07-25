const API_BASE_URL = "http://localhost:8080";

export async function apiClient(
  endpoint,
  options = {}
) {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,

      headers: {
        "Content-Type": "application/json",
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