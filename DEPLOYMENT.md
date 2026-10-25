# Domain and deployment configuration

DNS records are configured with your domain registrar or hosting provider, not in
FastAPI. The provider supplies the record type and target values for your deployment.

## Configure the app

1. Point your frontend hostname (for example, `chat.example.com`) and API hostname
   (for example, `api.example.com`) to the targets supplied by your hosting provider.
   Use the provider's recommended DNS record types and values; these vary by host.
2. Enable HTTPS for both hostnames in the hosting provider.
3. Configure the frontend build environment:
   - `VITE_API_BASE_URL=https://api.example.com`
   - `VITE_WS_BASE_URL=wss://api.example.com` (optional; derived automatically if omitted)
4. Configure the backend environment:
   - `CORS_ORIGINS=https://chat.example.com`
   - `JWT_SECRET_KEY` to a long, random secret stored in the hosting provider's secret settings.
5. Configure the backend host or reverse proxy to forward HTTP requests and WebSocket
   connections to FastAPI. The WebSocket route is `/ws/{conversation_id}`.
6. Rebuild and redeploy the frontend after changing its `VITE_` variables. Vite embeds
   these values into the built frontend.

For local development, the frontend defaults to `http://127.0.0.1:8001` and the backend
allows `http://localhost:5173` and `http://127.0.0.1:5173`. Copy the example environment
files when you need to override those defaults. Start FastAPI with
`uvicorn app.main:app --env-file .env --port 8001` so it reads backend settings from
`Chat-APP/.env`.
