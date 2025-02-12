import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelemetryModule } from 'opentelemetry-lib';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule } from '@nestjs/microservices';
import { LoggerModule } from 'nestjs-pino';
import { pinoConfig } from './configs/logger';
import { clientsConfig } from './configs/clients';
import { telemetryConfig } from './configs/telemetry';
import { UserKafkaController } from './user-kafka.controller';

@Module({
  imports: [
    TelemetryModule.forRoot(telemetryConfig),
    ClientsModule.registerAsync(clientsConfig),
    LoggerModule.forRoot(pinoConfig),
    HttpModule,
  ],
  controllers: [AppController, UserKafkaController],
  providers: [AppService],
})
export class AppModule {}
