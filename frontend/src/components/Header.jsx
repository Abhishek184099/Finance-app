import React from 'react'
import { useAuthContext } from '../context/AuthContext'

export default function Header() {

    const {authUser} = useAuthContext()
  return (
    <div className='flex justify-between items-center p-4 bg-blue-500 text-white'>
        <h1 className=''>
            Finacne App
        </h1>

        <h1 className='underline'>
            Hello {authUser.userName} !
        </h1>

    </div>
  )
}
