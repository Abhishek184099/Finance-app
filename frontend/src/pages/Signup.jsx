import React from 'react'
import { useState } from 'react'
import useSignup from "../hooks/useSignup"
import {Link} from "react-router-dom"


export default function Signup() {

    const [input , setInput] = useState({
        userName : "",
        password : "",
        email : "",
    })

    const { loading , signup } = useSignup();

  
    const handleSubmit = async(e) => {
        e.preventDefault();
        await signup(input)
        
    }
    
  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            className="w-full px-3 py-2 border border-gray-300"
            value={input.userName}
            onChange={(e) => setInput({ ...input, userName: e.target.value })}
          />
        </div>
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
            onChange={(e) => setInput({...input, password: e.target.value })}
           
            className="w-full px-3 py-2 border border-gray-300"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2">Register</button>
        <Link
						to={"/login"}
						className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
						href='#'
					>
						Already have an account?
					</Link>
      </form>
    </div>
  )
}
