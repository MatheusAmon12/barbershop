import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { Button } from "./ui/button"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import Link from "next/link"
import Image from "next/image"
// import { Avatar, AvatarImage } from "./ui/avatar"
import { quickSearchOptions } from "../_constants/search"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"

const SidebarSheet = () => {
    return (
        <SheetContent className="overflow-y-auto [&::-webkit-scrollbar]:hidden">
            <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            <div className="flex flex-row items-center justify-between gap-3 border-b border-solid py-5">
                <h2 className="font-bold">Olá, faça seu login!</h2>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="icon">
                            <LogInIcon />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[90%] rounded-lg">
                        <DialogHeader>
                            <DialogTitle>Faça login na plataforma</DialogTitle>
                            <DialogDescription>
                                Conecte-se usando sua conta do Google.
                            </DialogDescription>
                        </DialogHeader>

                        <Button variant="outline" className="gap-1 font-bold">
                            <Image
                                src="/google.svg"
                                width={18}
                                height={18}
                                alt="Entre com o Google"
                            />
                            Google
                        </Button>
                    </DialogContent>
                </Dialog>

                {/* <Avatar>
                    <AvatarImage src="https://utfs.io/f/7e309eaa-d722-465b-b8b6-76217404a3d3-16s.png" />
                </Avatar>

                <div>
                    <p className="text-sm font-bold">Matheus Amon</p>
                    <p className="text-xs">amonmatheus757@gmail.com</p>
                </div> */}
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
                    <Button
                        variant="ghost"
                        className="justify-start gap-2"
                        key={option.title}
                    >
                        <Image
                            src={option.imageUrl}
                            width={18}
                            height={18}
                            alt={option.title}
                        />
                        {option.title}
                    </Button>
                ))}
            </div>

            <div className="flex flex-col gap-2 border-b border-solid py-5">
                <Button variant="ghost" className="justify-start gap-2">
                    <LogOutIcon size={18} />
                    Sair da conta
                </Button>
            </div>
        </SheetContent>
    )
}

export default SidebarSheet
