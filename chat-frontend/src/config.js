const configuredApiBaseUrl =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8001";

export const API_BASE_URL = configuredApiBaseUrl.replace(/\/+$/, "");

function getWebSocketBaseUrl() {
  const configuredWebSocketBaseUrl = import.meta.env.VITE_WS_BASE_URL;
  if (configuredWebSocketBaseUrl) {
    return configuredWebSocketBaseUrl.replace(/\/+$/, "");
  }

  const apiUrl = new URL(API_BASE_URL);
  if (apiUrl.protocol === "https:") {
    apiUrl.protocol = "wss:";
  } else if (apiUrl.protocol === "http:") {
    apiUrl.protocol = "ws:";
  } else {
    throw new Error("VITE_API_BASE_URL must use http:// or https://");
  }

  return apiUrl.toString().replace(/\/+$/, "");
}

export const WS_BASE_URL = getWebSocketBaseUrl();
