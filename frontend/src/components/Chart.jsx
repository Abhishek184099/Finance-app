import React from 'react'
import { Line } from '@ant-design/charts';
import useGetTransaction from '../hooks/useGetTransaction';


export default function Chart() {

       const {transaction} = useGetTransaction();

       const formattedDate = transaction.map((t)=> {
        return new Date(t).toLocaleDateString('en-GB');
       })
       
       let sortedTransaction = transaction.sort((a,b) => {
        
        return new Date(a.date) - new Date(b.date);
       });
   


       const data = sortedTransaction.map((item)=> {
        let formattedDate = new Date(item.date).toLocaleDateString('en-GB');
        return {date:formattedDate,amount:item.amount}
       });

       const config = {
        data,
        xField: 'date',
        yField: 'amount',
        width : 800,
        height : 400,
      
      };
    

       
   let chart;
  return (
    <div className='flex flex-col gap-5 items-start justify-center my-2 '>
        <h1 className='font-semibold text-3xl mx-2 underline'>Finacne Analytics</h1>
        <Line {...config} onReady = {(chartInstance) => (chart = chartInstance)}/>
    </div>
  )
}
