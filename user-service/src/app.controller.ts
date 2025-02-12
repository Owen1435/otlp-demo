import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { mockRandomDelay } from './utils';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  async health(): Promise<string> {
    return 'OK';
  }

  @Get('/ping-success')
  async pingSuccess(): Promise<string> {
    await mockRandomDelay();
    return this.appService.pingSuccess();
  }

  @Get('/ping-error')
  async pingError(): Promise<void> {
    await mockRandomDelay();
    return this.appService.pingError();
  }

  @Get('/trace-by-http-success')
  async traceByHttpSuccess(): Promise<string> {
    await mockRandomDelay();
    return this.appService.pingSuccess();
  }

  @Get('/trace-by-http-fail')
  async traceByHttpFail(): Promise<void> {
    await mockRandomDelay();
    this.appService.pingError();
  }
}
