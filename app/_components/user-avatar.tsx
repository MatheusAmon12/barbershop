"use client"

import { useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { cn } from "../_lib/utils"

interface UserAvatarProps {
    showEmail?: boolean
    className?: string
}

const UserAvatar = ({ showEmail = true, className }: UserAvatarProps) => {
    const { data: session } = useSession()

    const firstName = session?.user?.name?.split(" ")[0][0] ?? ""
    const lastName = session?.user?.name?.split(" ")[1][0] ?? ""

    return (
        <div className="flex flex-row items-center gap-1">
            <Avatar className={cn("pointer-events-none", className)}>
                <AvatarImage src={session?.user?.image || ""} />
                <AvatarFallback className="bg-secondary uppercase text-white">
                    {firstName}
                    {lastName}
                </AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-0">
                <p className="text-sm font-bold">{session?.user?.name}</p>
                {showEmail && <p className="text-xs">{session?.user?.email}</p>}
            </div>
        </div>
    )
}

export default UserAvatar
