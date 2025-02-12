import { ReflectionService } from '@grpc/reflection';
import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { USER_SERVICE_PACKAGE_NAME, protobufPackage } from './proto/user-service';

export const getUserGrpcClientOptions = (url: string): ClientProviderOptions => ({
  name: USER_SERVICE_PACKAGE_NAME,
  transport: Transport.GRPC,
  options: {
    url,
    package: protobufPackage,
    protoPath: join(__dirname, '../proto/user-service.proto'),
    onLoadPackageDefinition: (pkg, server) => {
      new ReflectionService(pkg).addToServer(server);
    },
  },
});
