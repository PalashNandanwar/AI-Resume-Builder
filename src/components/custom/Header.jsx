/* eslint-disable no-unused-vars */

import React from 'react'
import logo from '/logo.svg'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'
import ColorModeSwitcher from '../../ColorModeSwitcher'

const Header = () => {
  const { user, isSignedIn } = useUser(); // Destructure to get user and isSignedIn


  return (
    <div>
      <nav className="flex justify-between px-8 py-7 shadow-md">
        <img src={logo} width={100} height={100} alt="logo" />
        {
          isSignedIn ?
            <div className='flex gap-3 items-center'>
              <ColorModeSwitcher />
              <Link to={'/dashboard'}>
                <Button className='text-slate-950 font-bold text-base' varient='outline'>Dashboard</Button>
              </Link>
              <UserButton />
            </div> :
            <div className=' flex gap-6'>
              <ColorModeSwitcher />
              <Link to={'/auth/Sign_In'}>
                <Button className='text-slate-950 font-bold text-base'>Log In</Button>
              </Link>

              <Link to={'/auth/Sign_In'}>
                <Button className='text-slate-950 font-bold text-base'>Sign In</Button>
              </Link>
            </div>
        }
      </nav>
    </div>
  )
}

export default Header
