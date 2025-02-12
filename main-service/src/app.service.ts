import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  pingSuccess(): string {
    return 'Hello from service 2';
  }

  pingError(): void {
    throw new InternalServerErrorException('Error from service 2');
  }

  async traceByHttpSuccess(): Promise<string> {
    return lastValueFrom(
      this.httpService
        .get<string>(
          `${process.env.USER_SERVICE_HTTP_URL}/trace-by-http-success`,
        )
        .pipe(map((res) => res.data)),
    );
  }

  async traceByHttpFail(): Promise<string> {
    return lastValueFrom(
      this.httpService
        .get<string>(`${process.env.USER_SERVICE_HTTP_URL}/trace-by-http-fail`)
        .pipe(map((res) => res.data)),
    ).catch((error) => {
      throw new InternalServerErrorException(
        `Handled error by service 2: ${error.message}`,
      );
    });
  }
}
