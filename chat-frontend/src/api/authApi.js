const API_BASE_URL = "http://127.0.0.1:8001";

export async function login(email, password) {
  const response = await fetch(
    `${API_BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: email,
        password,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Invalid email or password");
  }

  const data = await response.json();
  localStorage.setItem("access_token", data.access_token);
  return data;
}

export function logout() {
  localStorage.removeItem("access_token");
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem("access_token"));
}
