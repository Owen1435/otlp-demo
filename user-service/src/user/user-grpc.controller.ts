import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  GetUsersResponse,
  User,
  USER_SERVICE_NAME,
  UserServiceController,
} from 'proto-lib';

@Controller()
export class UserGrpcController implements UserServiceController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod(USER_SERVICE_NAME)
  async getUsers(): Promise<GetUsersResponse> {
    const users = await this.userService.getAll();
    return { users };
  }

  @GrpcMethod(USER_SERVICE_NAME)
  async getUserById({ id }: { id: string }): Promise<User> {
    return this.userService.getById(id);
  }

  @GrpcMethod(USER_SERVICE_NAME)
  async createUser(params: { name: string }): Promise<User> {
    return this.userService.create(params);
  }
}
