// Keep-alive service to prevent Render from spinning down
// This pings the backend every 10 minutes to keep it active

const BACKEND_URL = import.meta.env.VITE_PRODUCTION_API_URL || import.meta.env.VITE_API_URL;

class KeepAliveService {
  private intervalId: NodeJS.Timeout | null = null;
  private readonly PING_INTERVAL = 10 * 60 * 1000; // 10 minutes

  start() {
    // Only run in production and if we have a backend URL
    if (import.meta.env.PROD && BACKEND_URL && !BACKEND_URL.includes('localhost')) {
      console.log('Starting keep-alive service for backend...');
      
      this.intervalId = setInterval(() => {
        this.pingBackend();
      }, this.PING_INTERVAL);

      // Initial ping
      this.pingBackend();
    }
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('Keep-alive service stopped');
    }
  }

  private async pingBackend() {
    try {
      // Use a lightweight endpoint that doesn't require authentication
      const response = await fetch(`${BACKEND_URL}/api/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        console.log('Keep-alive ping successful');
      } else {
        console.log('Keep-alive ping failed with status:', response.status);
      }
    } catch (error) {
      console.log('Keep-alive ping failed:', error);
    }
  }
}

export const keepAliveService = new KeepAliveService();
