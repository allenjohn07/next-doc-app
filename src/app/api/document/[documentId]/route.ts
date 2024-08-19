import { db } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

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

        return new NextResponse('Successfully updated document', { status: 200 })
    } catch (error) {
        return new NextResponse(`${error}`, { status: 500 })
    }
}