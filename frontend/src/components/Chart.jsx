import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';
import useGetTransaction from '../hooks/useGetTransaction';

ChartJS.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export default function TransactionChart() {
  const { transaction } = useGetTransaction();
  const chartRef = useRef(null); // Ref to hold the chart instance

  const incomeTransaction = transaction.filter(t => t.type == "income")
  const sortedTransaction = incomeTransaction.sort((a, b) => new Date(a.date) - new Date(b.date));
  const labels = sortedTransaction.map((item) => new Date(item.date).toLocaleDateString('en-GB'));
  const amounts = sortedTransaction.map((item) => item.amount);

  
  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      chartRef.current.chart = new ChartJS(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Transaction Amount',
              data: amounts,
              borderColor: '#1890ff',
              backgroundColor: 'rgba(24, 144, 255, 0.2)',
              borderWidth: 2,
              pointRadius: 5,
              pointBackgroundColor: '#1890ff',
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Date',
              },
              grid: {
                display: false,
              },
            },
            y: {
              title: {
                display: true,
                text: 'Amount',
              },
              grid: {
                color: '#ddd',
                lineDash: [4, 4],
              },
            },
          },
          plugins: {
            tooltip: {
              enabled: true,
              mode: 'index',
              intersect: false,
              callbacks: {
                label: (context) => {
                  const label = context.dataset.label || '';
                  const value = context.raw || 0;
                  return `${label}: $${value}`;
                },
              },
            },
            legend: {
              display: true,
              position: 'top',
            },
          },
        },
      });
    }
  }, [transaction, labels, amounts]);

  // If no data is available, show a message
  if (transaction.length === 0) {
    return (
      <div className='flex flex-col gap-5 items-start justify-center my-2 p-4 bg-white rounded-lg shadow-md w-1/2'>
        <h1 className='font-semibold text-3xl mx-2 underline'>Finance Analytics</h1>
        <p className='text-gray-600 mx-2'>No transaction data available to display.</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-5 items-start justify-center my-2 p-4 bg-white rounded-lg shadow-md w-1/2'>
      <h1 className='font-semibold text-3xl mx-2 underline'>Finance Analytics</h1>
      <p className='text-gray-600 mx-2'>Visualizing transaction trends over time.</p>
      <div className='w-full h-[400px]'>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
}