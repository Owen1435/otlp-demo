import { ClientProvider, Transport } from '@nestjs/microservices';
import packageInfo from '../../package.json';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const CLIENT_KAFKA_PROVIDER = 'client-kafka-provider';

export const clientKafka: ClientProvider = {
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: [[process.env.KAFKA_HOST, process.env.KAFKA_PORT].join(':')],
    },
    consumer: {
      groupId: `${packageInfo.name}-consumer`,
    },
  },
};
