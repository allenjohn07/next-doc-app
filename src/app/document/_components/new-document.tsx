'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'
import { Plus } from 'lucide-react'
import React from 'react'

const NewDocument = () => {

    const { toast } = useToast()

    const createNewDoc = async () => {
        try {
            const response = await axios.post('/api/document/new')
            console.log(response);
            if(response.status == 200){
                toast({ title: 'Document added successfully' })
            }
        } catch (error) {
            console.log(error);
        }
    }

    const templateMap = [{
        component: (
            <button onClick={() => createNewDoc()}>
                <Card className='w-[150px] hover:border hover:border-blue-500 hover:cursor-pointer'>
                    <CardHeader></CardHeader>
                    <CardContent className='flex justify-center mx-auto'>
                        <Plus size={80} />
                    </CardContent>
                    <CardFooter></CardFooter>
                </Card>
            </button>
        ),
        footer: "Blank Document"
    }, {}]


    return (
        <div className='bg-gray-50 h-[300px] flex flex-row md:flex-col justify-center flex-wrap'>
            <div className='flex flex-col space-y-4 w-10/12 mx-auto flex-wrap'>
                <h3 className='text-muted-foreground text-xs'>Start a new document</h3>
                <div className='flex flex-wrap space-x-4'>
                    {
                        templateMap.map((template) => (
                            <div key={template.footer}>
                                {template.component}
                                <p className='text-sm ml-2 mt-2'>{template.footer}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default NewDocument