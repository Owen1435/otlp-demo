import { Inject, Injectable, Logger } from '@nestjs/common';
import { UserEntity } from '../entities';
import { UserRepository } from './user.repository';
import { userCreatedCountMetric } from '../metrics/metrics';
import { ClientKafka } from '@nestjs/microservices';
import { CLIENT_KAFKA_PROVIDER } from '../configs/kafka';
import { lastValueFrom } from 'rxjs';
import { setTimeout } from 'timers/promises';
import { ExecutionTimeMetric } from 'opentelemetry-lib';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly userRepository: UserRepository,
    @Inject(CLIENT_KAFKA_PROVIDER)
    private readonly kafkaService: ClientKafka,
  ) {}

  @ExecutionTimeMetric({ name: 'get-all-user' })
  async getAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async getById(userId: string): Promise<UserEntity> {
    return this.userRepository.findOneOrFail({ where: { id: userId } });
  }

  async create(params: { name: string }): Promise<UserEntity> {
    const user = UserEntity.create();
    user.name = (params.name || 'default') + Date.now();

    const newUser = await this.userRepository.save(user);
    this.logger.log(`User created ${JSON.stringify(newUser)}`);

    userCreatedCountMetric.add(1);
    await lastValueFrom(this.kafkaService.emit('user-created', newUser));

    await setTimeout(50);

    return newUser;
  }
}
