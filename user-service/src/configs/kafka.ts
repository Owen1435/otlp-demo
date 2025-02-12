import { ClientProvider, Transport } from '@nestjs/microservices';
import packageInfo from '../../package.json';

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
