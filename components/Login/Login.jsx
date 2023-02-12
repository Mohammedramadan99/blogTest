import { loginUserAction } from '@/redux/usersSlice'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Login() {
  const dispatch = useDispatch()
  const router = useRouter()
  const {userAuth} = useSelector(state => state.users)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const submitHandler = e =>
  {
    e.preventDefault()
    const userData = { email, password }
    dispatch(loginUserAction(userData))
  }

  useEffect(() => {
    if(userAuth?.token){
      router.push('/')
    }
  }, [userAuth?.token])

  return (
    <div className='login'>
        <form onSubmit={submitHandler}>
            <h1>login</h1>
            <input type="text" placeholder='email' onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)} />
            <input type="submit" className='submit-btn' value="log in" />
        </form>
    </div>
  )
}

export default Login