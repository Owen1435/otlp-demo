import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class AppService {
  pingSuccess(): string {
    return 'Hello from service 3';
  }

  pingError(): void {
    throw new InternalServerErrorException('Error from service 3');
  }
}
