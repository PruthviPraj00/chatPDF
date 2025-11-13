// api/create-chat

import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response){
    try {
        const body = await req.json()
        const [file_name, file_key] = body
    } catch (error) {
        return NextResponse.json(
            {error: "internal server error"},
            {status: 500}
        )
    }
}