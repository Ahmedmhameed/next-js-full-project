import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { NavLinks } from '@/constants';
import AuthProvider from './AuthProvider';
const Navbar = () => {
    const session = {};
    return (
        <nav className='flexBetween navbar'>
            <div className='flex-1 flexStart gap-10'>
                <Link href={"/"}>
                    <Image src={"/logo.svg"} alt='Logo' width={118} height={43} />
                </Link>
                <ul className='xl:flex hidden text-small gap-7'>
                    {NavLinks.map(link => (<Link key={link.key} href={link.href}>{link.text}</Link>))}
                </ul>
            </div>
            <div className='flexCenter gap-4'>
                {session ? (<>
                    user photo
                    <Link href={"/create-project"}>Share your Work</Link>
                </>) : (<AuthProvider />)}
            </div>
        </nav>
    )
}

export default Navbar
