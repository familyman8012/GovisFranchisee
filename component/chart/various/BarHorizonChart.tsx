import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import CustomTooltip from './CustomTooltip';

const data = [
  { name: '00시', value: 5000 },
  { name: '01시', value: 5000 },
  { name: '02시', value: 5000 },
  { name: '03시', value: 5000 },
  { name: '04시', value: 5000 },
  { name: '05시', value: 5000 },
  { name: '06시', value: 5000 },
  { name: '07시', value: 5000 },
  { name: '08시', value: 5000 },
  { name: '09시', value: 5000 },
  { name: '10시', value: 5000 },
  { name: '11시', value: 5000 },
  { name: '12시', value: 5000 },
  { name: '13시', value: 5000 },
  { name: '14시', value: 5000 },
  { name: '15시', value: 5000 },
  { name: '16시', value: 5000 },
  { name: '17시', value: 5000 },
  { name: '18시', value: 5000 },
  { name: '19시', value: 5000 },
  { name: '20시', value: 5000 },
  { name: '21시', value: 5000 },
  { name: '22시', value: 5000 },
  { name: '23시', value: 5000 },
];

export const BarHorizonChart = () => {
  return (
    <ResponsiveContainer width="100%" aspect={2.5}>
      <BarChart data={data} barSize={6}>
        <CartesianGrid strokeDasharray="3 0" vertical={false} />
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis
          tickCount={14}
          axisLine={false}
          tickLine={false}
          domain={[0, (dataMax: number) => dataMax * 1.2]}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" fill="var(--color-orange90)" />
      </BarChart>
    </ResponsiveContainer>
  );
};
