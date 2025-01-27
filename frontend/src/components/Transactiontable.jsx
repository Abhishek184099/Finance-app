import React from 'react';
import useGetTransaction from '../hooks/useGetTransaction';
import { Table } from 'antd';

export default function TransactionTable() {
  const { transaction } = useGetTransaction();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => {
        return <span className='font-medium'>{text.toUpperCase()}</span>;
      },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => {
        const formattedDate = new Date(text).toLocaleDateString('en-GB'); // Formats the date as DD/MM/YYYY
        return <span className='text-gray-600'>{formattedDate}</span>;
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text) => {
        return (
          <span
            className={`px-2 py-1 rounded-full text-sm ${
              text === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {text}
          </span>
        );
      },
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (text) => {
        return <span className='text-gray-600'>{text}</span>;
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text, record) => {
        return (
          <span
            className={`font-semibold ${
              record.type === 'income' ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {record.type === 'income' ? `+$${text}` : `-$${text}`}
          </span>
        );
      },
    },
  ];

  const sortedTransactions = transaction.sort((a, b) => {
    return b._id.localeCompare(a._id);
  });

  return (
    <div className='flex flex-col gap-5 py-3 px-4'>
      <h1 className='text-3xl font-semibold underline'>My Transactions</h1>
      <Table
        dataSource={sortedTransactions}
        columns={columns}
        pagination={{ pageSize: 5 }} // Enable pagination
        rowKey={(record) => record._id} // Unique key for each row
        bordered // Add border to the table
        className='shadow-lg rounded-lg overflow-hidden' // Add shadow and rounded corners
        rowClassName={(record, index) =>
          index % 2 === 0 ? 'bg-gray-50' : 'bg-white' // Alternating row colors
        }
      />
    </div>
  );
}