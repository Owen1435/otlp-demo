import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TelemetryModule } from 'opentelemetry-lib';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './configs/ormconfig';
import { UserHttpController } from './user/user-http.controller';
import { UserService } from './user/user.service';
import { UserRepository } from './user/user.repository';
import { telemetryConfig } from './configs/telemetry';
import { UserGrpcController } from './user/user-grpc.controller';
import { MetricsService } from './metrics/metric.service';
import { ClientsModule } from '@nestjs/microservices';
import { clientsConfig } from './configs/clients';
import { pinoConfig } from './configs/logger';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';

@Module({
  imports: [
    TelemetryModule.forRoot(telemetryConfig),
    TypeOrmModule.forRoot(dataSourceOptions),
    ClientsModule.registerAsync(clientsConfig),
    LoggerModule.forRoot(pinoConfig),
  ],
  controllers: [UserHttpController, UserGrpcController, AppController],
  providers: [AppService, MetricsService, UserService, UserRepository],
})
export class AppModule {}
