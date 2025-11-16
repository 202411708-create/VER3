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
  '미지의 시간': '#e5e7eb',
};

export const PieChartComponent: React.FC<PieChartComponentProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label
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
