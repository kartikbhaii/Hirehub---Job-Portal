
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { connect } from '@/app/lib/mongodb'
import User from '@/app/models/User'

export async function POST() {

    try {

        const { userId } = await auth()

        if (!userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
        }
        await connect()

        const user = await User.findOneAndUpdate(
            { clerkUserId: userId },
            { $setOnInsert: { clerkUserId: userId, role: null } },
            { upsert: true, new: true }
        );

        return NextResponse.json({ success: true, role: user.role });


    } catch (err) {
        console.error("User sync failed:", err);
        return NextResponse.json({ error: "User sync failed" }, { status: 500 });
    }
}
