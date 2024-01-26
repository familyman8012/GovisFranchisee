import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from 'recharts';

const rawData = {
  data: {
    list: [
      {
        item_label: '00',
        value_data: {
          value_list: [
            {
              value_key: 'pizza',
              value_label: '피자',
              base_value: 104,
              compare_value: 114,
            },
            {
              value_key: 'pasta',
              value_label: '파스타',
              base_value: 22,
              compare_value: 23,
            },
            {
              value_key: 'sallad',
              value_label: '샐러드',
              base_value: 50,
              compare_value: 70,
            },
          ],
          total_base_value: 176,
          total_compare_value: 207,
        },
      },
      {
        item_label: '01',
        value_data: {
          value_list: [
            {
              value_key: 'pizza',
              value_label: '피자',
              base_value: 59,
              compare_value: 26,
            },
            {
              value_key: 'pasta',
              value_label: '파스타',
              base_value: 9,
              compare_value: 7,
            },
            {
              value_key: 'sallad',
              value_label: '샐러드',
              base_value: 30,
              compare_value: 20,
            },
          ],
          total_base_value: 98,
          total_compare_value: 53,
        },
      },
    ],
  },
};

interface ItemData {
  itemLabel: string;
  [key: string]: string | number; // 이 부분은 string key와 string 또는 number 값을 허용합니다.
}

interface AccType {
  [key: string]: string; // 여기서 key는 문자열, 값은 어떤 타입이든 될 수 있습니다.
}

// Convert raw data to optimized data structure
const optimizedData = rawData.data.list.map(item => {
  const itemData: ItemData = {
    itemLabel: item.item_label,
  };

  item.value_data.value_list.forEach(value => {
    const label = value.value_key;
    itemData[`${label}_base`] = value.base_value;
    itemData[`${label}_compare`] = value.compare_value;
  });

  itemData.totalBase = item.value_data.total_base_value;
  itemData.totalCompare = item.value_data.total_compare_value;

  return itemData;
});

const legendLabels = rawData.data.list[0].value_data.value_list.reduce(
  (acc: AccType, curr) => {
    acc[curr.value_key] = curr.value_label;
    return acc;
  },
  {}
);
const formatXAxis = (tickItem: string) => {
  return `${tickItem}시`;
};

const baseKeys = rawData.data.list[0].value_data.value_list.map(
  valueItem => `${valueItem.value_key}_base`
);
const compareKeys = baseKeys.map(key => key.replace('_base', '_compare'));
const baseColors = ['#8884d8', '#ff8888', '#216ba5'];
const compareColors = ['#82ca9d', '#ffc0cb', '#216ba3'];

const renderCustomizedLabel = (type: string) => {
  const labelRenderer = (props: any) => {
    const { x, y, width, index } = props;
    const totalValue =
      type === 'base'
        ? optimizedData[index].totalBase
        : optimizedData[index].totalCompare;

    return (
      <text x={x + width / 2} y={y - 4} fill="#666" textAnchor="middle">
        {totalValue}
      </text>
    );
  };

  labelRenderer.displayName = `LabelRenderer(${type})`;
  return labelRenderer;
};

const StackedBarChart = () => {
  return (
    <>
      {optimizedData && (
        <ResponsiveContainer width="100%" aspect={2}>
          <BarChart width={600} height={300} data={optimizedData}>
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey="itemLabel" tickFormatter={formatXAxis} />
            <YAxis />
            <Tooltip />
            <Legend />
            {baseKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                stackId="base"
                fill={baseColors[index]}
                name={legendLabels[key.split('_')[0]]}
              >
                {' '}
                <LabelList content={renderCustomizedLabel('base')} />
              </Bar>
            ))}

            {compareKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                stackId="compare"
                fill={compareColors[index]}
                legendType="none"
              >
                {' '}
                <LabelList content={renderCustomizedLabel('compare')} />
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default StackedBarChart;
