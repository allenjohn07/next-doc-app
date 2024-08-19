import { db } from '@/utils/db'
import React from 'react'
import EditorBlock from './_components/editor-block'

const SingleDocumentPage = async ({ params }: {
    params: {
        documentId: string
    }
}) => {

    const getDocument = await db.document.findUnique({
        where: {
            id: params.documentId
        }
    })
    

    return (
        <div className='mt-6'>
            <EditorBlock document={getDocument}/>
        </div>
    )
}

export default SingleDocumentPage