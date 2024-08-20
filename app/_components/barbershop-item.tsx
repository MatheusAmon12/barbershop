import { Barbershop } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { StarIcon } from "lucide-react"
import { Badge } from "./ui/badge"
import Link from "next/link"

interface BarbershopItemProps {
    barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
    return (
        <Card className="min-w-[167px] rounded-2xl">
            <CardContent className="p-0 pt-1">
                <div className="relative h-[159px] w-full">
                    <Image
                        src={barbershop.imageUrl}
                        alt={barbershop.name}
                        fill
                        className="rounded-2xl object-cover p-1"
                    />

                    <Badge
                        className="absolute left-2 top-2 gap-2"
                        variant="secondary"
                    >
                        <StarIcon
                            size={12}
                            className="fill-primary text-primary"
                        />
                        <span className="text-sm font-semibold">5,0</span>
                    </Badge>
                </div>
                <div className="px-1 py-3">
                    <h3 className="truncate font-semibold">
                        {barbershop.name}
                    </h3>
                    <p className="truncate text-sm text-gray-400">
                        {barbershop.address}
                    </p>
                    <Button variant="secondary" className="mt-3 w-full" asChild>
                        <Link href={`/barbershops/${barbershop.id}`}>
                            Reservar
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default BarbershopItem
