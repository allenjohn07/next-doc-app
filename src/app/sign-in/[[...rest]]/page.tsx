import { SignIn } from '@clerk/nextjs'
import React from 'react'

const Page = () => {
  return (
    <div className='flex justify-center py-16'>
        <SignIn />
    </div>
  )
}

export default Page