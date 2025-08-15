import { Button } from "@/app/_components/ui/button"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import ServiceItem from "@/app/_components/service-item"
import PhoneItem from "@/app/_components/phone-item"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import SidebarSheet from "@/app/_components/sidebar-sheet"
import { getBarbershopById } from "@/app/_data/get-barbershop-by-id"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar"
import { AVAILABILITY_TIMES_AND_DAYS } from "./constants"

interface BarbershopPageProps {
    params: {
        id: string
    }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
    const barbershop = await getBarbershopById({ params })

    if (!barbershop) {
        return notFound()
    }

    return (
        <div className="grid grid-cols-1 items-start gap-10 lg:container lg:mt-10 lg:grid-cols-[3.5fr_2fr]">
            <div>
                <div className="relative h-[250px] w-full lg:h-[485.9px]">
                    <Image
                        alt={barbershop.name}
                        src={barbershop.imageUrl}
                        fill
                        quality={100}
                        className="object-cover lg:rounded-lg"
                    />

                    <Button
                        size="icon"
                        variant="secondary"
                        className="absolute left-4 top-4 lg:hidden"
                        asChild
                    >
                        <Link href="/">
                            <ChevronLeftIcon />
                        </Link>
                    </Button>

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                size="icon"
                                variant="secondary"
                                className="absolute right-4 top-4 lg:hidden"
                            >
                                <MenuIcon />
                            </Button>
                        </SheetTrigger>
                        <SidebarSheet />
                    </Sheet>
                </div>

                <div className="border-b border-solid p-5 lg:flex lg:justify-between lg:px-0">
                    <div>
                        <h1 className="mb-3 text-xl font-bold lg:text-3xl">
                            {barbershop.name}
                        </h1>

                        <div className="mb-2 flex items-center gap-2">
                            <MapPinIcon className="text-primary" size={18} />
                            <p className="text-sm">{barbershop.address}</p>
                        </div>

                        <div className="flex items-center gap-2 lg:hidden">
                            <StarIcon
                                className="fill-primary text-primary"
                                size={18}
                            />
                            <p className="text-sm">5,0 (889 avaliações)</p>
                        </div>
                    </div>
                    <Card className="hidden lg:flex lg:items-center lg:justify-center">
                        <div className="flex min-h-full flex-col items-center justify-center gap-1 px-5">
                            <div className="flex items-center justify-center gap-1">
                                <StarIcon
                                    className="fill-primary text-primary"
                                    size={18}
                                />
                                <p className="text-lg">5,0</p>
                            </div>
                            <p className="text-sm">889 avaliações</p>
                        </div>
                    </Card>
                </div>

                <div className="space-y-2 border-b border-solid p-5 lg:hidden lg:px-0">
                    <h2 className="text-xs font-bold uppercase text-gray-400">
                        Sobre nós
                    </h2>
                    <p className="text-justify text-sm">
                        {barbershop.description}
                    </p>
                </div>

                <div className="space-y-3 border-b border-solid p-5 lg:border-none lg:px-0">
                    <h2 className="text-sm font-bold uppercase text-gray-400">
                        Serviços
                    </h2>

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        {barbershop.services.map((service) => (
                            <ServiceItem
                                barbershop={JSON.parse(
                                    JSON.stringify(barbershop),
                                )}
                                service={JSON.parse(JSON.stringify(service))}
                                key={service.id}
                            />
                        ))}
                    </div>
                </div>

                <div className="space-y-3 p-5 lg:hidden">
                    {barbershop.phones.map((phone) => (
                        <PhoneItem key={phone} phone={phone} />
                    ))}
                </div>
            </div>
            <Card className="hidden lg:flex">
                <CardContent className="flex flex-col gap-5">
                    <div className="relative mt-6 flex h-[180px] w-full items-end justify-center p-5">
                        <Image
                            src="/map.png"
                            alt={`Mapa da barbearia ${barbershop?.name}.png`}
                            fill
                            className="rounded-xl object-cover"
                        />

                        <Card className="z-10 w-full">
                            <CardContent className="justify-left flex items-center gap-3 px-5 py-3">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage
                                        src={barbershop?.imageUrl}
                                        alt={barbershop?.name}
                                    />
                                </Avatar>
                                <div>
                                    <h2 className="font-bold">
                                        {barbershop?.name}
                                    </h2>
                                    <p className="overflow-clip text-ellipsis text-nowrap text-xs">
                                        {barbershop?.address}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-2 border-b border-solid p-5 lg:px-0">
                        <h2 className="text-xs font-bold uppercase">
                            Sobre nós
                        </h2>
                        <p className="text-justify text-sm text-gray-400">
                            {barbershop.description}
                        </p>
                    </div>

                    <div className="space-y-3 border-b border-solid p-5">
                        {barbershop.phones.map((phone) => (
                            <PhoneItem key={phone} phone={phone} />
                        ))}
                    </div>

                    <div className="flex flex-col gap-3 border-b border-solid p-5">
                        {AVAILABILITY_TIMES_AND_DAYS.map((dayAndTime) => (
                            <div
                                key={dayAndTime.day}
                                className="flex justify-between"
                            >
                                <span className="text-left text-sm capitalize text-muted-foreground">
                                    {dayAndTime.day}
                                </span>
                                <span className="text-right text-sm capitalize">
                                    {dayAndTime.fromTime && dayAndTime.toTime
                                        ? `${dayAndTime.fromTime} - ${dayAndTime.toTime}`
                                        : "fechado"}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between p-5">
                        <p className="text-sm first-letter:capitalize">
                            em parceria com
                        </p>
                        <Image
                            alt="FSW Barber"
                            src="/Logo.png"
                            height={18}
                            width={120}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default BarbershopPage
