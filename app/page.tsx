import { SearchIcon } from "lucide-react"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"
import { Card, CardContent } from "./_components/ui/card"
import { Badge } from "./_components/ui/badge"
import { Avatar } from "./_components/ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"

const Home = async () => {
    const barbershops = await db.barbershop.findMany({})
    const popularBarbershops = await db.barbershop.findMany({
        orderBy: {
            name: "desc",
        },
    })

    return (
        <>
            <Header />

            <section className="p-5">
                <h2 className="text-xl font-bold">Olá, Matheus!</h2>
                <span>Sexta-feira, 16 de Agosto</span>

                <div className="mt-6 flex flex-row gap-2">
                    <Input placeholder="Faça sua busca..." />
                    <Button variant="default">
                        <SearchIcon />
                    </Button>
                </div>

                <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
                    <Button variant="secondary" className="gap-2 text-sm">
                        <Image
                            src="/hair.svg"
                            width={16}
                            height={16}
                            alt="Barba"
                        />
                        Cabelo
                    </Button>

                    <Button variant="secondary" className="gap-2 text-sm">
                        <Image
                            src="/barber.svg"
                            width={16}
                            height={16}
                            alt="Barba"
                        />
                        Barba
                    </Button>

                    <Button variant="secondary" className="gap-2 text-sm">
                        <Image
                            src="/details.svg"
                            width={16}
                            height={16}
                            alt="Barba"
                        />
                        Acabemento
                    </Button>

                    <Button variant="secondary" className="gap-2 text-sm">
                        <Image
                            src="/eyebrow.svg"
                            width={16}
                            height={16}
                            alt="Sobrancelha"
                        />
                        Sobrancelha
                    </Button>

                    <Button variant="secondary" className="gap-2 text-sm">
                        <Image
                            src="/hydration.svg"
                            width={16}
                            height={16}
                            alt="Hidratação"
                        />
                        Hidratação
                    </Button>

                    <Button variant="secondary" className="gap-2 text-sm">
                        <Image
                            src="/massage.svg"
                            width={16}
                            height={16}
                            alt="Massagem"
                        />
                        Massagem
                    </Button>
                </div>

                <div className="relative mt-6 h-[150px] w-full">
                    <Image
                        alt="Agende nos melhores com o FSW Barber"
                        src="/BannerPizza.png"
                        fill
                        className="rounded-xl object-cover"
                    />
                </div>

                <h2 className="mb-3 mt-6 text-sm font-bold uppercase text-gray-400">
                    Agendamentos
                </h2>
                <Card>
                    <CardContent className="flex flex-row justify-between p-0">
                        <div className="flex flex-col gap-2 py-5 pl-5">
                            <Badge className="w-fit">Confirmado</Badge>
                            <h3 className="font-semibold">Corte de Cabelo</h3>
                            <div className="flex flex-row items-center gap-1">
                                <Avatar className="h-6 w-6">
                                    <AvatarImage src="https://utfs.io/f/7e309eaa-d722-465b-b8b6-76217404a3d3-16s.png" />
                                </Avatar>
                                <p className="text-sm">Barbearia FSW</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
                            <p className="text-sm">Agosto</p>
                            <p className="text-xl">16</p>
                            <p className="text-sm">20:00</p>
                        </div>
                    </CardContent>
                </Card>

                <h2 className="mb-3 mt-6 text-sm font-bold uppercase text-gray-400">
                    Recomendados
                </h2>
                <div className="flex flex-row gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
                    {barbershops.map((barbershop) => (
                        <BarbershopItem
                            key={barbershop.id}
                            barbershop={barbershop}
                        />
                    ))}
                </div>

                <h2 className="mb-3 mt-6 text-sm font-bold uppercase text-gray-400">
                    Populares
                </h2>
                <div className="flex flex-row gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
                    {popularBarbershops.map((popularBarbershop) => (
                        <BarbershopItem
                            key={popularBarbershop.id}
                            barbershop={popularBarbershop}
                        />
                    ))}
                </div>
            </section>
        </>
    )
}

export default Home
