import { Observable } from "rxjs";
export declare const protobufPackage = "UserService";
export interface Empty {
}
export interface User {
    id: string;
    name: string;
    status: string;
}
export interface GetUserByIdRequest {
    id: string;
}
export interface CreateUserRequest {
    name: string;
}
export interface GetUsersResponse {
    users: User[];
}
export declare const USER_SERVICE_PACKAGE_NAME = "UserService";
export interface UserServiceClient {
    getUsers(request: Empty): Observable<GetUsersResponse>;
    getUserById(request: GetUserByIdRequest): Observable<User>;
    createUser(request: CreateUserRequest): Observable<User>;
}
export interface UserServiceController {
    getUsers(request: Empty): Promise<GetUsersResponse> | Observable<GetUsersResponse> | GetUsersResponse;
    getUserById(request: GetUserByIdRequest): Promise<User> | Observable<User> | User;
    createUser(request: CreateUserRequest): Promise<User> | Observable<User> | User;
}
export declare function UserServiceControllerMethods(): (constructor: Function) => void;
export declare const USER_SERVICE_NAME = "UserService";
