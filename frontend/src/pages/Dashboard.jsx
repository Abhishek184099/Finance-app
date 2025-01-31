import React from 'react'
import Header from '../components/Header'
import IncomeCard from '../components/Modal/Addincome'
import ExpenseCard from '../components/Modal/Addexpense'
import BalanceCard from '../components/Modal/Totalbalance'
import Transactiontable from '../components/Transactiontable'
import Chart from '../components/Chart'
import PieChart from '../components/PieChart'


export default function Dashboard() {
  return (
    <div className='mx-2'>
        <Header/>
        <div className='flex justify-around    p-6'>
        <BalanceCard/>
        <IncomeCard/>
        <ExpenseCard/>
        </div>
        <div className = "flex gap-4 p-4">
          <Chart/>
          <PieChart/>
        </div>
        <div >
        <Transactiontable />
        </div>
       
        


    </div>
  )
}
