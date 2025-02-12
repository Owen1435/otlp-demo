// ======== init opentelemetry ===========
import { initOpentelemetry } from 'opentelemetry-lib/build/otel-sdk';
import { telemetryConfig } from './configs/telemetry';

initOpentelemetry(telemetryConfig);
// =======================================

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { Logger } from 'nestjs-pino';
import { clientKafka } from './configs/kafka';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));

  const httpHost = process.env.APP_HOST || 'localhost';
  const httpPort = process.env.APP_PORT || 3000;

  app.connectMicroservice(clientKafka);

  await Promise.all([
    app.startAllMicroservices(),
    app.listen(httpPort, httpHost),
  ]);

  console.log(`Service HTTP started: http://${httpHost}:${httpPort}`);
}
bootstrap();
