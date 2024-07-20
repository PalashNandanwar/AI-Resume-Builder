/* eslint-disable no-unused-vars */
// import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { useUser } from '@clerk/clerk-react';
import { Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
    const { user, isLoaded, isSignedIn } = useUser();
    return (
        <>
            <div className="h-full w-full p-20">
                <div className='flex flex-col pb-4 border-b-2'>
                    <div className=' px-[18px]'>
                        <h1 className='text-4xl font-extrabold uppercase'>Resume Builder</h1>
                        <p className='font-semibold text-xl  py-3'>
                            Experience the future of resume building with our AI-driven platform
                        </p>
                    </div>
                    {isSignedIn ? (
                        <Link to={'/dashboard'}>
                            <Button className='text-slate-950 font-bold text-base'>Dashboard</Button>
                        </Link>
                    ) : (
                        <Link to={'/auth/Sign_In'}>
                            <Button className='text-slate-950 font-bold text-base' variant='outline'>Get Started</Button>
                        </Link>
                    )}
                </div>

                <div className=' flex justify-between items-center mt-3'>
                    <div className='flex gap-4'>
                        {/* text */}
                        <span className=' text-[12px] cursor-pointer'>© 2024 Resume Builder</span>
                        <span className=' text-[12px] cursor-pointer'>Terms & Privacy</span>
                        <span className=' text-[12px] cursor-pointer'>Product Changelog</span>
                    </div>
                    <div className='flex gap-4 cursor-pointer'>
                        <Linkedin />
                        <Instagram />
                        <Youtube />
                        <Twitter />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer