import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from '../entities';
import { setTimeout } from 'timers/promises';

@Controller('users')
export class UserHttpController {
  constructor(private readonly userService: UserService) {}

  @Get('/ping')
  async ping(): Promise<string> {
    await setTimeout(100);
    return 'Im good';
  }

  @Get('/:id')
  async getById(@Param() { id }: { id: string }): Promise<UserEntity> {
    return this.userService.getById(id);
  }

  @Get()
  async getAll(): Promise<UserEntity[]> {
    return this.userService.getAll();
  }

  @Post()
  async create(@Body() params: { name: string }): Promise<UserEntity> {
    return this.userService.create(params);
  }
}
