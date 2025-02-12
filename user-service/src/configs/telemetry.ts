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
    port: 3113,
    endpoint: '/metrics',
  },
  instrumentations: [
    EInstrumentationName.Http,
    EInstrumentationName.Express,
    EInstrumentationName.Nest,
    EInstrumentationName.Typeorm,
    EInstrumentationName.Pg,
    EInstrumentationName.Amqp,
    EInstrumentationName.Grpc,
    EInstrumentationName.Kafka,
  ],
  sampling: {
    common: {
      percent: 0.05,
    },
    http: {
      ignoreRoutes: ['/health', '/metrics'],
    },
  },
};
