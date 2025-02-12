import { Injectable, Logger } from '@nestjs/common';
import {
  TUserStatusGaugeMetricAttributes,
  userStatusGaugeMetric,
} from './metrics';
import { UserRepository } from '../user/user.repository';
import { ObservableResult } from 'opentelemetry-lib';

@Injectable()
export class MetricsService {
  private readonly logger = new Logger(MetricsService.name);

  constructor(private readonly userRepository: UserRepository) {
    userStatusGaugeMetric.addCallback(this.setUserStatusGaugeMetric.bind(this));
  }

  private async setUserStatusGaugeMetric(
    observable: ObservableResult<TUserStatusGaugeMetricAttributes>,
  ): Promise<void> {
    try {
      const rows = await this.userRepository.query(`
        select u.status as status,
               count(u.id) as count
        from users u
        group by u.status
      `);
      for (const row of rows) {
        observable.observe(row.count, { status: row.status });
      }
    } catch (err: any) {
      this.logger.error(
        `Set metric (userStatusGaugeMetric) error: ${err.message}`,
      );
    }
  }
}
