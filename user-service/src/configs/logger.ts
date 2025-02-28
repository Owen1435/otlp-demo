import { Params } from 'nestjs-pino/params';
import packageInfo from '../../package.json';

export const pinoConfig: Params = {
  pinoHttp: {
    autoLogging: false,
    transport: {
      targets: [
        {
          target: 'pino-loki',
          options: {
            host: 'http://localhost:3100',
            labels: { app: 'otel_demo', service_name: packageInfo.name },
            json: true,
            interval: 1,
            batching: true,
          },
        },
        {
          target: 'pino-pretty',
          options: {
            colorize: true,
            timestampKey: 'time',
            translateTime: true,
            singleLine: true,
          },
        },
      ],
    },
  },
};
