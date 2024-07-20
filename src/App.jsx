/* eslint-disable no-unused-vars */

import { Navigate, Outlet } from 'react-router-dom'
import './App.css'
import { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import Header from './components/custom/Header'
import { Toaster } from './components/ui/sonner'


const App = () => {

  const [count, setUser] = useState(0)
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isSignedIn && isLoaded) {
    console.log("Navigation complete");
    return <Navigate to={'/auth/Sign_In'} />
  }
  return (
    <>
      <Header />
      <Outlet />
      <Toaster />
    </>
  )
}

export default App
