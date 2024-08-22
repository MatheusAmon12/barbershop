import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet"
import { quickSearchOptions } from "../_constants/search"
import { Avatar, AvatarImage } from "./ui/avatar"
import Link from "next/link"

const Header = () => {
    return (
        <Card>
            <CardContent className="flex flex-row items-center justify-between p-5">
                <Image
                    alt="FSW Barber"
                    src="/Logo.png"
                    height={18}
                    width={120}
                />

                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline">
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="overflow-y-auto [&::-webkit-scrollbar]:hidden">
                        <SheetHeader>
                            <SheetTitle className="text-left">Menu</SheetTitle>
                        </SheetHeader>

                        <div className="flex flex-row gap-3 border-b border-solid py-5">
                            <Avatar>
                                <AvatarImage src="https://utfs.io/f/7e309eaa-d722-465b-b8b6-76217404a3d3-16s.png" />
                            </Avatar>

                            <div>
                                <p className="text-sm font-bold">
                                    Matheus Amon
                                </p>
                                <p className="text-xs">
                                    amonmatheus757@gmail.com
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 border-b border-solid py-5">
                            <SheetClose asChild>
                                <Button className="justify-start gap-2" asChild>
                                    <Link href="/">
                                        <HomeIcon size={18} />
                                        Início
                                    </Link>
                                </Button>
                            </SheetClose>

                            <Button
                                variant="ghost"
                                className="justify-start gap-2"
                            >
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
                            <Button
                                variant="ghost"
                                className="justify-start gap-2"
                            >
                                <LogOutIcon size={18} />
                                Sair da conta
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>
            </CardContent>
        </Card>
    )
}

export default Header
