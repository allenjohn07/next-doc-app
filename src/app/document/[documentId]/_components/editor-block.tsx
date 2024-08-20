"use client"

import Editor from '@/components/editor'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { redirect } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useToast } from "@/components/ui/use-toast"

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

    const { toast } = useToast()

    const EditorForm = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: document.title || "",
            description: document.description || ""
        }
    })

    //function to update document
    async function onUpdateChange(values: z.infer<typeof FormSchema>) {
        try {
            const response = await axios.put(`/api/document/${document?.id}`, values);
            toast({ title: `${response.data}` })
        } catch (error) {
            console.log(error);
        }
    }

    //function to delete document
    async function onDocumentDelete() {
        try {
            const deleteResponse = await axios.delete(`/api/document/${document?.id}`)
            toast({ title: `${deleteResponse.data}`, variant: "destructive" })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='p-4'>
            <div className='my-2 space-x-4 flex justify-end'>
                <form onSubmit={onDocumentDelete} className='text-end'>
                    <Button type="submit" variant="destructive" className='px-2 h-8'>Delete</Button>
                </form>
            </div>
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
                    <Button className='mt-20 md:mt-8 px-2 h-8' type="submit">Save changes</Button>
                </form>
            </Form>
        </div>
    )
}

export default EditorBlock