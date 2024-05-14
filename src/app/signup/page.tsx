'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function signupPage() {
  const router = useRouter()

  const [user ,setUser] = useState({
    email:'',
    username:'',
    password:''
  })

  const [buttonDisabled,setbuttonDisabled] = useState(true)
  const [loading,setLoading] = useState(false)
  
  const onSignUp = async ()=> {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/signup",user)
      console.log("Signup SuccessFull",response.data)
      router.push('/login')

    } catch (error:any) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(user.email.length > 0 && user.username.length>0 && user.password.length>0){
      setbuttonDisabled(false)
    }
    else{
      setbuttonDisabled(true)
    }
  },[user])
  




  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing" : "Signup"}</h1>
        <hr />
        <label htmlFor="username">username</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}
            placeholder="username"
            />
        <label htmlFor="email">email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="password">password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
            <button
            onClick={onSignUp}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "No signup" : "Signup"}</button>
            <Link href="/login">Visit login page</Link>
        </div>
  )
}

