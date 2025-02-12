import {
  metrics,
  ValueType,
  Counter,
  ObservableGauge,
} from 'opentelemetry-lib';
import packageInfo from '../../package.json';

const meterName = `${packageInfo.name}_meter`;
const meter = metrics.getMeterProvider().getMeter(meterName);

export const userCreatedCountMetric: Counter = meter.createCounter(
  'app_user_created_count',
  {
    description: 'The count of created user',
    valueType: ValueType.INT,
  },
);

export type TUserStatusGaugeMetricAttributes = {
  status: string;
};

export const userStatusGaugeMetric: ObservableGauge<TUserStatusGaugeMetricAttributes> =
  meter.createObservableGauge<TUserStatusGaugeMetricAttributes>(
    'app_user_status_gauge',
    {
      description: 'The number of user by status',
      valueType: ValueType.INT,
    },
  );
