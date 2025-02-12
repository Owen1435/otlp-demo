import { EInstrumentationName, TTelemetryConfig } from 'opentelemetry-lib';
import packageInfo from '../../package.json';

export const telemetryConfig: TTelemetryConfig = {
  enabled: true,
  servicePrefix: 'demo-app:',
  serviceName: packageInfo.name,
  version: packageInfo.version,
  env: 'development',
  traces: {
    collectorUrl: 'http://localhost:4318/v1/traces',
  },
  metrics: {
    exportIntervalMillis: 30000,
    hostMetricsEnabled: true,
    apiMetricsEnabled: true,
    apiMetricsIgnoreRoutes: [],
    port: 3112,
    endpoint: '/metrics',
  },
  instrumentations: [
    EInstrumentationName.Http,
    EInstrumentationName.Express,
    EInstrumentationName.Nest,
    EInstrumentationName.Typeorm,
    EInstrumentationName.Grpc,
    EInstrumentationName.Pino,
    EInstrumentationName.Kafka,
  ],
  sampling: {
    http: {
      ignoreRoutes: ['/health', '/metrics'],
    },
  },
};
