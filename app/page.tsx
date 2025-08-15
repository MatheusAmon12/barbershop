import { Button } from "./_components/ui/button"
import Image from "next/image"
import { db } from "./_lib/prisma"
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

    console.log("", confirmedBookings)

    return (
        <>
            <section className="p-5 lg:bg-hero-background lg:bg-contain lg:bg-no-repeat lg:px-32">
                <div className="lg:flex lg:justify-between lg:gap-32 lg:py-16">
                    <div
                        className={`flex flex-col lg:min-w-[439px] ${confirmedBookings?.length > 0 && "justify-between"}`}
                    >
                        <div>
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
                                    {format(new Date(), "MMMM", {
                                        locale: ptBR,
                                    })}
                                </span>
                            </p>
                        </div>
                        <div className="mt-6">
                            <Search />
                        </div>
                        <div>
                            {session?.user &&
                                confirmedBookings &&
                                confirmedBookings.length >= 1 && (
                                    <div className="flex flex-col gap-4">
                                        <h2 className="text-sm font-bold uppercase text-muted-foreground">
                                            agendamentos
                                        </h2>
                                        <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                                            <BookingItem
                                                booking={confirmedBookings[0]}
                                            />
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                    <div className="hidden lg:block lg:min-w-[617px]">
                        <BarbershopCarousel
                            sectionTitle="recomendados"
                            barbershops={barbershops}
                        />
                    </div>
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

                <div className="mb-3 mt-6 lg:mt-10 lg:hidden">
                    {confirmedBookings.length !== 0 && (
                        <>
                            <h2 className="text-sm font-bold uppercase text-gray-400">
                                Agendamentos
                            </h2>
                            {session?.user ? (
                                <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                                    {confirmedBookings.map((booking) => (
                                        <BookingItem
                                            key={booking.id}
                                            booking={JSON.parse(
                                                JSON.stringify(booking),
                                            )}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-left text-sm text-gray-400">
                                    Faça login para ver seus agendamentos
                                </p>
                            )}
                        </>
                    )}
                </div>

                <div className="mb-3 mt-6 lg:mt-10">
                    <BarbershopCarousel
                        sectionTitle="recomendados"
                        barbershops={barbershops}
                    />
                </div>

                <div className="mb-3 mt-6 lg:mt-10">
                    <BarbershopCarousel
                        sectionTitle="populares"
                        barbershops={popularBarbershops}
                    />
                </div>
            </section>
        </>
    )
}

export default Home
