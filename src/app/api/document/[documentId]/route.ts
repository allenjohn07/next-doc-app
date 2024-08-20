import { db } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";


//update route
export async function PUT(req: Request, { params }: { params: { documentId: string } }) {
    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse("User not authenticated", { status: 401 })
        }

        const { title, description } = await req.json()

        const updatedDocument = await db.document.update({
            where: {
                id: params.documentId,
                userId: userId
            },
            data: {
                title: title,
                description: description
            }
        })
        revalidatePath('/document')
        return new NextResponse('Successfully updated document', { status: 200 })
    } catch (error) {
        return new NextResponse(`${error}`, { status: 500 })
    }
}

//Delete route
export async function DELETE(req: Request, { params }: { params: { documentId: string } }) {
    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse("User not authenticated", { status: 401 })
        }

        const deleteDocument = await db.document.delete({
            where: {
                id: params.documentId,
                userId: userId
            }
        })
        revalidatePath('/document')
        return new NextResponse('Successfully deleted document', { status: 200 })
    } catch (error) {
        return new NextResponse(`${error}`, { status: 500 })
    }
}