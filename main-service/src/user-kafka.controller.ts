import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Transport } from '@nestjs/microservices';

@Controller()
export class UserKafkaController {
  private readonly logger = new Logger(UserKafkaController.name);

  @MessagePattern('user-created', Transport.KAFKA)
  async userCreated(): Promise<void> {
    this.logger.log(`User has been created`);
  }
}
