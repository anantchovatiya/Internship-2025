"use client";
import React from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
export const Navbar = () => {
  const { data: session } = useSession()
  return (
    <nav className='bg-black text-white flex justify-between px-5 md:h-16 items-center flex-col md:flex-row'>
        <div className="logo font-bold text-3xl md:text-lg my-2 md:my-0">
          {<Link href={"/"}>
          FueltheChai!
          </Link>}

        </div>
        <div className="flex gap-3 md:gap-5 items-center">

        {session && <Link href={"/dashboard"}><button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Dashboard</button></Link>}
        {session && <>
        <div>

        <Link href={`/${session.user.email.split('@')[0]}`}>
        <button type="button" className="w-28 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-xs md:text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Your Page</button>
        </Link>
        </div>
        <div>
        <button type="button" className="w-28 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-xs md:text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={()=>{signOut()}}>Logout</button>
        </div>
        </>
        }
        {!session && <Link href={"/login"}>
        <div>
        <button type="button" className="w-28 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-xs md:text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Login</button>
        </div>
        </Link>}
        </div>

    </nav>
  )
}
