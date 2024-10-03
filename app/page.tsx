import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/booking-item"
import Search from "./_components/search"
import Link from "next/link"
import { authOptions } from "./_lib/auth"
import { getServerSession } from "next-auth"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

const Home = async () => {
    const session = await getServerSession(authOptions)
    const barbershops = await db.barbershop.findMany({})
    const popularBarbershops = await db.barbershop.findMany({
        orderBy: {
            name: "desc",
        },
    })

    const confirmedBookings = session?.user
        ? await db.booking.findMany({
              where: {
                  userId: (session.user as any).id,
                  date: {
                      gte: new Date(),
                  },
              },
              include: {
                  service: {
                      include: {
                          barbershop: true,
                      },
                  },
              },
              orderBy: {
                  date: "asc",
              },
          })
        : []

    return (
        <>
            <Header />

            <section className="p-5">
                <h2 className="text-xl font-bold">
                    Olá,{" "}
                    {session?.user
                        ? session.user.name?.split(" ")[0]
                        : "bem vindo"}
                    !
                </h2>
                <p>
                    <span className="capitalize">
                        {format(new Date(), "EEEE, dd", { locale: ptBR })}
                    </span>
                    <span>&nbsp;de&nbsp;</span>
                    <span className="capitalize">
                        {format(new Date(), "MMMM", { locale: ptBR })}
                    </span>
                </p>

                <div className="mt-6">
                    <Search />
                </div>

                <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
                    {quickSearchOptions.map((option) => (
                        <Button
                            variant="secondary"
                            className="gap-2 text-sm"
                            key={option.title}
                            asChild
                        >
                            <Link
                                href={`/barbershops?services=${option.title}`}
                            >
                                <Image
                                    src={option.imageUrl}
                                    width={16}
                                    height={16}
                                    alt={option.title}
                                />
                                {option.title}
                            </Link>
                        </Button>
                    ))}
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
                {session?.user ? (
                    <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                        {confirmedBookings.map((booking) => (
                            <BookingItem
                                key={booking.id}
                                booking={JSON.parse(JSON.stringify(booking))}
                            />
                        ))}

                        {confirmedBookings.length === 0 && (
                            <p className="text-left text-sm text-gray-400">
                                Nenhum agendamento confirmado
                            </p>
                        )}
                    </div>
                ) : (
                    <p className="text-left text-sm text-gray-400">
                        Faça login para ver seus agendamentos
                    </p>
                )}

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
