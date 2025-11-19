// src/components/analysis/PieChart.tsx

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface PieChartData {
  name: string;
  value: number;
  percentage: string;
  [key: string]: string | number;
}

interface PieChartComponentProps {
  data: PieChartData[];
}

const COLORS: Record<string, string> = {
  수면: '#374151',
  공부: '#3b82f6',
  식사: '#fb923c',
  SNS: '#ec4899',
  게임: '#a855f7',
  운동: '#22c55e',
  기타: '#f59e0b',
  '미지의 시간': '#9ca3af', // 더 진한 회색으로 변경
};

export const PieChartComponent: React.FC<PieChartComponentProps> = ({ data }) => {
  // 비율 라벨 렌더링 함수
  const renderCustomLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;

    if (!midAngle || !percent) return null;

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // 5% 미만인 경우 라벨 표시하지 않음
    if (percent < 0.05) return null;

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#9ca3af'} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) => {
            const hours = Math.floor(value / 60);
            const minutes = value % 60;
            return minutes > 0 ? `${hours}시간 ${minutes}분` : `${hours}시간`;
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
