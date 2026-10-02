const API_BASE_URL = "http://127.0.0.1:8001";

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

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
    const responseText = await response.text();
    let message = `API Error: ${response.status}`;

    if (responseText) {
      try {
        const body = JSON.parse(responseText);
        message = body.detail || body.message || message;
      } catch {
        message = responseText;
      }
    }

    throw new ApiError(response.status, message);
  }

  return response.json();
}