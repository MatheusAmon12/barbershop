"use client"

import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import SidebarSheet from "./sidebar-sheet"
import Link from "next/link"
import Search from "./search"
import { useIsMobile } from "../hooks/use-is-mobile"
import { usePathname } from "next/navigation"

const Header = () => {
    const { isMobile } = useIsMobile()
    const pathname = usePathname()

    const isHomePage = pathname === "/"
    const shouldShowHeader = !isHomePage && !isMobile

    return (
        <Card className="w-full">
            <CardContent className="flex w-full flex-row items-center justify-between p-5 lg:container">
                <Link href="/">
                    <Image
                        alt="FSW Barber"
                        src="/Logo.png"
                        height={18}
                        width={120}
                    />
                </Link>

                {shouldShowHeader && <Search className="w-1/3" />}

                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline">
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>
                    <SidebarSheet />
                </Sheet>
            </CardContent>
        </Card>
    )
}

export default Header
