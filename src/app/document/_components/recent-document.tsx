import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { db } from '@/utils/db'
import { auth } from '@clerk/nextjs/server'
import { BookText } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const RecentDocument = async () => {

    const { userId } = auth()

    if (!userId) {
        redirect('/')
    }

    const userDocuments = await db.document.findMany({
        where: {
            userId: userId
        },
        orderBy: {
            createAt: 'asc'
        }
    })



    return (
        <div className='my-4 mx-auto w-10/12'>
            <h1 className='font-semibold text-sm mb-4'>Recent Document</h1>
            <div className='flex gap-8 flex-wrap'>
                {
                    userDocuments.length > 0 ? (
                        userDocuments.map((document) => (
                            <div key={document.id} className='w-[150px]'>
                                <Link href={`/document/${document.id}`}>
                                    <Card className='w-[150px] hover:border hover:border-blue-500 hover:cursor-pointer'>
                                        <CardHeader></CardHeader>
                                        <CardContent className='flex justify-center mx-auto'>
                                            <BookText size={60} />
                                        </CardContent>
                                        <CardFooter></CardFooter>
                                    </Card>
                                </Link>
                                <p className='text-sm mt-2'>{document.title}</p>
                            </div>
                        ))
                    ) : (
                        <p className='text-sm'>You have no documents yet!</p>
                    )
                }
            </div>
        </div >
    )
}

export default RecentDocument