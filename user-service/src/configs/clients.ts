import { CLIENT_KAFKA_PROVIDER, clientKafka } from './kafka';

export const clientsConfig: any = {
  clients: [
    {
      name: CLIENT_KAFKA_PROVIDER,
      useFactory: () => clientKafka,
    },
  ],
};
