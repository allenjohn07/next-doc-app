import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Karla } from 'next/font/google'
import { cn } from '@/lib/utils'


const karla = Karla({
    subsets: ["latin"],
    weight: "500"
})

const Logo = () => {
    return (
        <div className='flex items-center'>
            <Link className='flex items-center' href={"/"}>
                <Image src="/logo.svg" height={30} width={30} alt='logo' />
                <h2 className={cn('text-2xl ml-2', karla.className)}>docAi</h2>
            </Link>
        </div>
    )
}

export default Logo