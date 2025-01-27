import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, PieController } from 'chart.js';
import useGetTransaction from '../hooks/useGetTransaction';

ChartJS.register(ArcElement, Tooltip, Legend, PieController);

export default function PieChart() {
  const { transaction } = useGetTransaction();
  const chartRef = useRef(null); // Ref to hold the chart instance

  // Filter and process expenses
  const expenses = transaction.filter(t => t.type === "expense");
  const categories = [...new Set(expenses.map(t => t.category))]; // Get unique categories

  // Calculate total expenses for each category
  const categoryTotals = categories.map(category => {
    return expenses
      .filter(t => t.category === category)
      .reduce((total, t) => total + t.amount, 0);
  });

  // Define colors for each category
  const backgroundColors = [
    '#A8D5E2', // Soft Blue
    '#F9D6C1', // Soft Peach
    '#FFE082', // Light Yellow
  ];

  // Define border colors
  const borderColors = [
    '#FFFFFF', 
    '#FFFFFF',
    '#FFFFFF',
  ];

  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy(); // Destroy existing chart
      }

      const ctx = chartRef.current.getContext('2d');
      chartRef.current.chart = new ChartJS(ctx, {
        type: 'pie',
        data: {
          labels: categories,
          datasets: [
            {
              label: 'Expenses by Category',
              data: categoryTotals,
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              enabled: true,
              callbacks: {
                label: (context) => {
                  const label = context.label || '';
                  const value = context.raw || 0;
                  return `${label}: $${value}`;
                },
              },
            },
            legend: {
              display: true,
              position: 'bottom',
            },
          },
          // Hover effects
          hover: {
            mode: 'nearest',
            intersect: true,
          },
        },
      });
    }
  }, [transaction, categories, categoryTotals]);

  // If no expense data is available, show a message
  if (expenses.length === 0) {
    return (
      <div className='flex flex-col gap-5 items-start justify-center my-2 p-4 bg-white rounded-lg shadow-md w-1/2'>
        <h1 className='font-semibold text-3xl mx-2 underline'>Expense Analytics</h1>
        <p className='text-gray-600 mx-2'>No expense data available to display.</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-5 items-start justify-center my-2 p-4 bg-white rounded-lg shadow-md w-1/2'>
      <h1 className='font-semibold text-3xl mx-2 underline'>Expense Analytics</h1>
      <p className='text-gray-600 mx-2'>Visualizing expenses by category.</p>
      <div className='w-full h-[400px]'>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
}