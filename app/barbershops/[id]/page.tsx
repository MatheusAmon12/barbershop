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
        <>
            <div className="relative h-[250px] w-full">
                <Image
                    alt={barbershop.name}
                    src={barbershop.imageUrl}
                    fill
                    className="object-cover"
                />

                <Button
                    size="icon"
                    variant="secondary"
                    className="absolute left-4 top-4"
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
                            className="absolute right-4 top-4"
                        >
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>
                    <SidebarSheet />
                </Sheet>
            </div>

            <div className="border-b border-solid p-5 lg:px-32">
                <h1 className="mb-3 text-xl font-bold">{barbershop.name}</h1>

                <div className="mb-2 flex items-center gap-2">
                    <MapPinIcon className="text-primary" size={18} />
                    <p className="text-sm">{barbershop.address}</p>
                </div>

                <div className="flex items-center gap-2">
                    <StarIcon className="fill-primary text-primary" size={18} />
                    <p className="text-sm">5,0 (889 avaliações)</p>
                </div>
            </div>

            <div className="space-y-2 border-b border-solid p-5 lg:px-32">
                <h2 className="text-xs font-bold uppercase text-gray-400">
                    Sobre nós
                </h2>
                <p className="text-justify text-sm">{barbershop.description}</p>
            </div>

            <div className="space-y-3 border-b border-solid p-5 lg:px-32">
                <h2 className="text-sm font-bold uppercase text-gray-400">
                    Serviços
                </h2>

                <div className="space-y-3">
                    {barbershop.services.map((service) => (
                        <ServiceItem
                            barbershop={JSON.parse(JSON.stringify(barbershop))}
                            service={JSON.parse(JSON.stringify(service))}
                            key={service.id}
                        />
                    ))}
                </div>
            </div>

            <div className="space-y-3 p-5">
                {barbershop.phones.map((phone) => (
                    <PhoneItem key={phone} phone={phone} />
                ))}
            </div>
        </>
    )
}

export default BarbershopPage
