import { db } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        //if user not loggedin return
        const { userId } = auth()
        if (!userId) {
            return new NextResponse("User not authenticated", { status: 401 })
        }

        const createNewDoc = await db.document.create({
            data: {
                userId: userId,
                title: "Untitled Document",
                description: ""
            }
        })

        console.log(createNewDoc);
        

        revalidatePath('/document')
        return NextResponse.json(createNewDoc, { status: 200 })
    } catch (error) {
        return new NextResponse(`${error}`, { status: 500 })
    }
}