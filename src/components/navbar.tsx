import React from 'react'
import { SignInButton, SignedOut, UserButton, SignedIn } from '@clerk/nextjs'
import Logo from './logo'
import { Button } from './ui/button'
import Link from 'next/link'

const Navbar = () => {
    return (
        <div className='my-2 mx-4 flex items-center justify-between py-2'>
            {/* logo */}
            <Logo/>
            {/* auth */}
            <div>
                <SignedOut>
                    <Link href={'/sign-in'}>
                        <Button variant="outline">Sign In</Button>
                    </Link>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    )
}

export default Navbar