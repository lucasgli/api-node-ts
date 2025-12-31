class HealthService {
  execute() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}

export const healthService = new HealthService();