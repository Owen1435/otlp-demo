"use strict";
// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.2
//   protoc               v5.29.3
// source: proto/user-service.proto
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_SERVICE_NAME = exports.USER_SERVICE_PACKAGE_NAME = exports.protobufPackage = void 0;
exports.UserServiceControllerMethods = UserServiceControllerMethods;
/* eslint-disable */
const microservices_1 = require("@nestjs/microservices");
exports.protobufPackage = "UserService";
exports.USER_SERVICE_PACKAGE_NAME = "UserService";
function UserServiceControllerMethods() {
    return function (constructor) {
        const grpcMethods = ["getUsers", "getUserById", "createUser"];
        for (const method of grpcMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            (0, microservices_1.GrpcMethod)("UserService", method)(constructor.prototype[method], method, descriptor);
        }
        const grpcStreamMethods = [];
        for (const method of grpcStreamMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            (0, microservices_1.GrpcStreamMethod)("UserService", method)(constructor.prototype[method], method, descriptor);
        }
    };
}
exports.USER_SERVICE_NAME = "UserService";
