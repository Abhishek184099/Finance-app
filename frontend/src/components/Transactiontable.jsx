import React from 'react';
import useGetTransaction from '../hooks/useGetTransaction';
import { Table } from 'antd';

export default function Transactiontable() {


  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render : (text) => {
         return text.toUpperCase();
      }
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => {
        const formattedDate = new Date(text).toLocaleDateString('en-GB'); // Formats the date as DD/MM/YYYY
        return formattedDate;
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount", 
  
    }
  ];

  const { transaction } = useGetTransaction();

   const textDecoration = () => {
    if (transaction.type === "expense"){
      return (<p className='text-red-500'>-{transaction.amount}</p>)
    } 
    
    return (<p className='text-green-500'>+{transaction.amount}</p>)
   }

  const sortedTransactions = transaction.sort((a, b) => {
    textDecoration();
    return b._id.localeCompare(a._id);
  });


  return (

    <div className='flex flex-col gap-5 py-3'>

        <h1 className='text-3xl font-semibold underline mx-2'>My transaction</h1>

        <Table dataSource={sortedTransactions} columns={columns} />
    </div>
  );
}
