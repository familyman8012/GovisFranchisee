// Import necessary components from Recharts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import CustomTooltip from './CustomTooltip';

// This could be in a separate file where you fetch or define your data
const mockData = [
  // Replace these with your actual data structure
  {
    item_label: 'Category 1',
    base_sales_count: 4000,
    comparison_sales_count: 2400,
  },
  {
    item_label: 'Category 2',
    base_sales_count: 3000,
    comparison_sales_count: 1398,
  },
  {
    item_label: 'Category 3',
    base_sales_count: 2000,
    comparison_sales_count: 9800,
  },
  {
    item_label: 'Category 4',
    base_sales_count: 2780,
    comparison_sales_count: 3908,
  },
  // ... add as many categories as you have data for
];

const DiffBarChart = () => {
  return (
    <ResponsiveContainer width="100%" aspect={2}>
      <BarChart width={500} height={561} data={mockData}>
        <CartesianGrid strokeDasharray="3 0" vertical={false} />
        <XAxis dataKey="item_label" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} tickCount={11} />
        <Tooltip content={<CustomTooltip />} />
        <Legend iconType="circle" iconSize={12} />
        <Bar dataKey="base_sales_count" fill="#8884d8" />
        <Bar dataKey="comparison_sales_count" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DiffBarChart;
