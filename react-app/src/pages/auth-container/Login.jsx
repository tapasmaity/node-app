import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'

function Login() {
  const [inputData, setInputData] = useState({
    emial: "",
    password: ""
  })

  const login = () => {
    alert(inputData.emial)
  }
  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center bg-gray-100">
      <div className='w-[300px] bg-white rounded-2xl text-center px-3 py-[20px]'>
        <h1 className='font-bold text-2xl'>Login</h1>
        <div className="mb-2">
          <Label className="mb-1">Email</Label>
          <Input
            type="email"
            placeholder="Email"
            value={inputData.emial}
            onChange={(e) => setInputData({ ...inputData, emial: e.target.value })}
          />
        </div>
        <div className="mb-2">
          <Label className="mb-1">Password</Label>
          <Input
            type="password"
            placeholder="Password"
            value={inputData.password}
            onChange={(e) => setInputData({ ...inputData, password: e.target.value })}
          />
        </div>
        <p className="text-xs text-blue-400 mb-3 text-right cursor-pointer">Forget password?</p>
        <Button className='w-full mb-3' onClick={() => login()}>Submit</Button>
        <p className="text-xs mb-3">
          Have an account?
          <Link to="#" className='text-blue-400'> Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default Login