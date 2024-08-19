"use client"

import Editor from '@/components/editor'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const FormSchema = z.object({
    title: z.string().min(2).max(50),
    description: z.string().min(2),
})

interface DocumentProps {
    id: string,
    userId: string,
    title: string | null
    description: string | null
    createAt: Date,
    updateAt: Date
}

interface EditorBlockProps {
    document?: DocumentProps | null
}

const EditorBlock: React.FC<EditorBlockProps> = ({ document }) => {

    if (!document) {
        redirect('/')
    }

    const EditorForm = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: document.title || "",
            description: document.description || ""
        }
    })

    async function onUpdateChange(values: z.infer<typeof FormSchema>) {
        try {
            await axios.put(`/api/document/${document?.id}`, values);
            revalidatePath('/')
            revalidatePath('/document/' + document?.id)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Form {...EditorForm} >
                <form onSubmit={EditorForm.handleSubmit(onUpdateChange)}>
                    <FormField control={EditorForm.control}
                        name="title"
                        render={({ field }) => <FormItem className='my-4'>
                            <FormControl>
                                <Input placeholder="Enter title here" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>}
                    >
                    </FormField>
                    <FormField control={EditorForm.control}
                        name="description"
                        render={({ field }) => <FormItem>
                            <FormControl>
                                <Editor {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>}
                    >
                    </FormField>
                    <Button type="submit">Save changes</Button>
                </form>
            </Form>
        </div>
    )
}

export default EditorBlock