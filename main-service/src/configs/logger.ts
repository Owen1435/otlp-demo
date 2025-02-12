import { Params } from 'nestjs-pino/params';

export const pinoConfig: Params = {
  pinoHttp: {
    autoLogging: false,
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        timestampKey: 'time',
        translateTime: true,
        singleLine: true,
      },
    },
  },
};
