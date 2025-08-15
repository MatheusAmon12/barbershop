"use client"

import { Button } from "./ui/button"
import { Calendar } from "lucide-react"
import UserAvatar from "./user-avatar"
import { useSession } from "next-auth/react"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import SignInDialog from "./sign-in-dialog"
import Link from "next/link"

interface BookingsButtonProps {
    showUserAvatar?: boolean
}

const BookingsButton = ({ showUserAvatar = false }: BookingsButtonProps) => {
    const { data: session } = useSession()

    const getBookingButton = () =>
        session?.user ? (
            <>
                <Button variant="ghost" className="justify-start gap-1" asChild>
                    <Link href="/bookings">
                        <Calendar size={18} />
                        Agendamentos
                    </Link>
                </Button>
                {showUserAvatar && (
                    <UserAvatar showEmail={false} className="size-9" />
                )}
            </>
        ) : (
            <Dialog>
                <DialogTrigger className="justify-start" asChild>
                    <Button variant="ghost" className="gap-1">
                        <Calendar size={16} />
                        Agendamentos
                    </Button>
                </DialogTrigger>
                <DialogContent className="w-[90%]">
                    <SignInDialog />
                </DialogContent>
            </Dialog>
        )

    return getBookingButton()
}

export default BookingsButton
