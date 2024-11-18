"use client"

import Link from "next/link"
import Image from "next/image" //to optimize our code during image rendering
import {useEffect, useState} from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"

const Nav = () =>{
    type ProviderType = any;
    const {data: session} = useSession() //we are using this session with communication with backend api's which we are going to define moving forward

    const [providers, setProviders] = useState<ProviderType | null>(null);
    const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

    useEffect(()=>{
        ;(async ()=>{
            const res:any = await getProviders() //getting available providers given by next auth
            setProviders(res)
        })()
    },[]);

    const handleSignOut = () => {
        signOut(); // Call the signOut function when the button is clicked
      };

    return(
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href='/' className="flex gap-2 flex-center">
                <Image
                    src='/assets/images/logo.svg'
                    alt="logo"
                    width={30}
                    height={30}
                    className="object-contain"
                />
                <p className="logo_text">PrompMania</p>
            </Link>
            {/* This content is only visible on screens 640px or wider.(desktop devices) */}
            <div className="sm:flex hidden">
                {/* check first if user existor not */}
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt" className="black_btn">
                        Create Prompt
                        </Link>

                        <button type="button" onClick={handleSignOut} className="outline_btn">
                            Sign Out
                        </button>

                        <Link href="/profile">
                        <Image
                            src={session?.user?.image || '/assets/images/logo.svg'}
                            alt="profile"
                            width={37}
                            height={37}
                            className="rounded-full"
                        />
                        </Link>
                    </div>
                ) : (
                    <>
                    {providers && 
                        Object.values(providers).map((provider:any)=>(
                            <button
                            type="button"
                            key={provider.name}
                            onClick={()=>{
                                signIn(provider.id)
                            }}
                            className="black_btn"
                            >
                                Sign In
                            </button>
                        ))
                    }</>
                )}
            </div>
            {/* This content is visible only on small screens (less than 640px)(mobile devices) */}
            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className="flex">
                        <Image
                            src={session?.user?.image || '/assets/images/logo.svg'}
                            width={37}
                            height={37}
                            className='rounded-full'
                            alt='profile'
                            onClick={() => setToggleDropdown((prev)=> !prev)}
                        />

                        {
                            toggleDropdown && (
                                <div className="dropdown">
                                    <Link
                                    href='/profile'
                                    className="dropdown_link"
                                    onClick={()=> setToggleDropdown(false)}
                                    >
                                        My Profile
                                    </Link>
                                    <Link
                                    href='/create-prompt'
                                    className="dropdown_link"
                                    onClick={()=> setToggleDropdown(false)}
                                    >
                                        Create Prompt
                                    </Link>
                                    <button 
                                    type="button"
                                    onClick={()=>{
                                        setToggleDropdown(false)
                                        signOut()
                                    }}
                                    className="mt-5 w-full black_btn"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )
                        }
                    </div>
                ):(
                    <>
                    {providers && 
                    Object.values(providers).map((provider:any)=>(
                        <button 
                        type="button"
                        key={provider.name}
                        onClick={()=>{
                            signIn(provider.id)
                        }}
                        className="black_btn"
                        >
                            Sign in
                        </button>
                    ))}
                    </>
                )}
            </div>
        </nav>
    )
}

export default Nav