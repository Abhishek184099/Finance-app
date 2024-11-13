import React from 'react'
import useLogin from '../hooks/useLogin'
import { useState } from 'react';
import {Link} from "react-router-dom";



export default function Login() {

    const {login} = useLogin();

 
    const [input , setInput] = useState({
        password : "",
        email : "",
    })

    const handleSubmit = async(e) => {
        e.preventDefault();
        await login(input)
    }

    return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={(e) => setInput({...input, email: e.target.value })}
          
            className="w-full px-3 py-2 border border-gray-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={(e) => setInput({...input , password : e.target.value})} 
        
            className="w-full px-3 py-2 border border-gray-300"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2">Login</button>
        <Link to='/signup' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
            {"Don't"} have an account?
          </Link>
      </form>
    </div>
  )
}
