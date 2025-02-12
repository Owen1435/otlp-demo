"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserGrpcClientOptions = void 0;
const reflection_1 = require("@grpc/reflection");
const microservices_1 = require("@nestjs/microservices");
const path_1 = require("path");
const user_service_1 = require("./proto/user-service");
const getUserGrpcClientOptions = (url) => ({
    name: user_service_1.USER_SERVICE_PACKAGE_NAME,
    transport: microservices_1.Transport.GRPC,
    options: {
        url,
        package: user_service_1.protobufPackage,
        protoPath: (0, path_1.join)(__dirname, '../proto/user-service.proto'),
        onLoadPackageDefinition: (pkg, server) => {
            new reflection_1.ReflectionService(pkg).addToServer(server);
        },
    },
});
exports.getUserGrpcClientOptions = getUserGrpcClientOptions;
