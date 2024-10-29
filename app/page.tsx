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
import { getBarbershops } from "./_data/get-barbershops"
import { getPopularBarbershops } from "./_data/get-popular-barbershops"
import BarbershopCarousel from "./_components/barbershop-carousel"

const Home = async () => {
    const session = await getServerSession(authOptions)
    const barbershops = await getBarbershops()
    const popularBarbershops = await getPopularBarbershops()

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

            <section className="p-5 lg:bg-hero-background lg:bg-contain lg:bg-no-repeat lg:px-32">
                <div className="lg:flex lg:justify-between lg:gap-32 lg:py-16">
                    <div className="lg:min-w-[439px]">
                        <h2 className="text-xl font-bold">
                            Olá,{" "}
                            {session?.user
                                ? session.user.name?.split(" ")[0]
                                : "bem vindo"}
                            !
                        </h2>
                        <p>
                            <span className="capitalize">
                                {format(new Date(), "EEEE, dd", {
                                    locale: ptBR,
                                })}
                            </span>
                            <span>&nbsp;de&nbsp;</span>
                            <span className="capitalize">
                                {format(new Date(), "MMMM", { locale: ptBR })}
                            </span>
                        </p>
                        <div className="mt-6">
                            <Search />
                        </div>
                    </div>
                    <BarbershopCarousel barbershops={barbershops} />
                </div>

                <div className="mt-6 flex gap-3 overflow-x-scroll lg:hidden [&::-webkit-scrollbar]:hidden">
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

                <div className="relative mt-6 h-[150px] w-full lg:hidden">
                    <Image
                        alt="Agende nos melhores com o FSW Barber"
                        src="/BannerPizza.png"
                        fill
                        className="rounded-xl object-cover"
                    />
                </div>

                <h2 className="mb-3 mt-6 text-sm font-bold uppercase text-gray-400 lg:mt-10">
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

                <div className="lg:hidden">
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
