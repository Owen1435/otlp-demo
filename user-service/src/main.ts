// ======== init opentelemetry ===========
import { telemetryConfig } from './configs/telemetry';
import { initOpentelemetry } from 'opentelemetry-lib/build/otel-sdk';

initOpentelemetry(telemetryConfig);
// =======================================

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { getUserGrpcClientOptions } from 'proto-lib';
import { clientKafka } from './configs/kafka';
import { Logger } from 'nestjs-pino';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));

  const httpHost = process.env.APP_HOST || 'localhost';
  const httpPort = process.env.APP_PORT || 3000;

  const grpcHost = process.env.GRPC_HOST || 'localhost';
  const grpcPort = process.env.GRPC_PORT || 50051;

  app.connectMicroservice(
    getUserGrpcClientOptions([grpcHost, grpcPort].join(':')),
  );

  app.connectMicroservice(clientKafka);

  await Promise.all([
    app.startAllMicroservices(),
    app.listen(httpPort, httpHost),
  ]);

  console.log(`Service HTTP started: http://${httpHost}:${httpPort}`);
  console.log(`Service started on port: grpc://${grpcHost}:${grpcPort}`);
}
bootstrap();
