"use client"

import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { Button } from "./ui/button"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarImage } from "./ui/avatar"
import { quickSearchOptions } from "../_constants/search"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { signOut, useSession } from "next-auth/react"
import SignInDialog from "./sign-in-dialog"

const SidebarSheet = () => {
    const { data } = useSession()
    const handleClickSignOutGoogle = () =>
        signOut({
            callbackUrl: "/",
        })

    return (
        <SheetContent className="w-[90%] overflow-y-auto [&::-webkit-scrollbar]:hidden">
            <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            <div className="flex flex-row items-center justify-between gap-3 border-b border-solid py-5">
                {data?.user ? (
                    <div className="flex flex-row items-center gap-1">
                        <Avatar>
                            <AvatarImage src={data.user.image || ""} />
                        </Avatar>

                        <div>
                            <p className="text-sm font-bold">
                                {data.user.name}
                            </p>
                            <p className="text-xs">{data.user.email}</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <h2 className="font-bold">Olá, faça seu login!</h2>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size="icon">
                                    <LogInIcon />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="w-[90%] rounded-lg">
                                <SignInDialog />
                            </DialogContent>
                        </Dialog>
                    </>
                )}
            </div>

            <div className="flex flex-col gap-2 border-b border-solid py-5">
                <SheetClose asChild>
                    <Button
                        variant="ghost"
                        className="justify-start gap-2"
                        asChild
                    >
                        <Link href="/">
                            <HomeIcon size={18} />
                            Início
                        </Link>
                    </Button>
                </SheetClose>

                <Button variant="ghost" className="justify-start gap-2">
                    <CalendarIcon size={18} />
                    Agendamentos
                </Button>
            </div>

            <div className="flex flex-col gap-2 border-b border-solid py-5">
                {quickSearchOptions.map((option) => (
                    <SheetClose asChild key={option.title}>
                        <Button
                            variant="ghost"
                            className="justify-start gap-2"
                            asChild
                        >
                            <Link
                                href={`/barbershops?services=${option.title}`}
                            >
                                <Image
                                    src={option.imageUrl}
                                    width={18}
                                    height={18}
                                    alt={option.title}
                                />
                                {option.title}
                            </Link>
                        </Button>
                    </SheetClose>
                ))}
            </div>

            {data?.user && (
                <div className="flex flex-col gap-2 border-b border-solid py-5">
                    <Button
                        variant="ghost"
                        className="justify-start gap-2"
                        onClick={handleClickSignOutGoogle}
                    >
                        <LogOutIcon size={18} />
                        Sair da conta
                    </Button>
                </div>
            )}
        </SheetContent>
    )
}

export default SidebarSheet
