"use client"

import { Barbershop, BarbershopService, Booking } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Sheet, SheetContent, SheetFooter, SheetTitle } from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { useEffect, useMemo, useState } from "react"
import { isPast, isToday, set } from "date-fns"
import { createBooking } from "../_actions/create-booking"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { getBookings } from "../_actions/get-bookings"
import { Dialog, DialogContent } from "./ui/dialog"
import SignInDialog from "./sign-in-dialog"
import BookingSumary from "./booking-sumary"
import { useRouter } from "next/navigation"

interface ServiceItemProps {
    service: BarbershopService
    barbershop: Pick<Barbershop, "name">
}

const TIME_LIST = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
]

interface getTimeListProps {
    bookings: Booking[]
    selectedDay: Date
}

const getTimeList = ({ bookings, selectedDay }: getTimeListProps) => {
    // TODO: Não exibir horários que estão no passado
    return TIME_LIST.filter((time) => {
        const hour = Number(time.split(":")[0])
        const minutes = Number(time.split(":")[1])

        const isTimeOnThePast = isPast(
            set(new Date(), { hours: hour, minutes }),
        )

        if (isTimeOnThePast && isToday(selectedDay)) {
            return false
        }

        const hasBookingOnCurrentTime = bookings.some(
            (booking) =>
                booking.date.getHours() === hour &&
                booking.date.getMinutes() === minutes,
        )

        if (hasBookingOnCurrentTime) {
            return false
        }
        return true
    })
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
    const { data } = useSession()
    const router = useRouter()

    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
    const [selectedTime, setSelectedTime] = useState<string | undefined>(
        undefined,
    )
    const [dayBookings, setDayBookings] = useState<Booking[]>([])
    const [isBookingSheetOpen, setIsBookingSheetOpen] = useState(false)
    const [isSignInDialogOpen, setIsSignInDialogOpen] = useState(false)

    const handleBookingClick = () => {
        if (data?.user) return setIsBookingSheetOpen(true)
        return setIsSignInDialogOpen(true)
    }

    const handleBookingSheetOpenChange = () => {
        setSelectedDay(undefined)
        setSelectedTime(undefined)
        setDayBookings([])
        setIsBookingSheetOpen(false)
    }

    const handleDateSelected = (date: Date | undefined) => {
        setSelectedDay(date)
    }

    const handleSelectTime = (time: string) => {
        setSelectedTime(time)
    }

    const handleCreateBooking = async () => {
        try {
            if (!selectedDate) return

            await createBooking({
                serviceId: service.id,
                date: selectedDate,
            })

            toast.success("Reserva criada com sucesso!", {
                action: {
                    label: "Ver agendamentos",
                    onClick: () => router.push("/bookings"),
                },
            })
            setIsBookingSheetOpen(false)
            handleBookingSheetOpenChange()
        } catch (error) {
            console.log(error)
            toast.error("Erro ao criar reserva!")
        }
    }

    const timeList = useMemo(() => {
        if (!selectedDay) return []

        return getTimeList({
            bookings: dayBookings,
            selectedDay,
        })
    }, [dayBookings, selectedDay])

    const selectedDate = useMemo(() => {
        if (!selectedDay || !selectedTime) return
        return set(selectedDay, {
            minutes: Number(selectedTime.split(":")[1]),
            hours: Number(selectedTime.split(":")[0]),
        })
    }, [selectedDay, selectedTime])

    useEffect(() => {
        const fecthDayBookings = async () => {
            if (!selectedDay) return

            const bookings = await getBookings({
                serviceId: service.id,
                date: selectedDay,
            })
            setDayBookings(bookings)
        }
        fecthDayBookings()
    }, [selectedDay, service.id])

    console.log({ dayBookings })

    return (
        <>
            <Card>
                <CardContent className="flex items-center gap-3 p-3">
                    <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
                        <Image
                            alt={service.name}
                            src={service.imageUrl}
                            fill
                            className="rounded-lg object-cover"
                        />
                    </div>
                    <div className="flex flex-col justify-between gap-[6.5px]">
                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold">
                                {service.name}
                            </h3>
                            <p className="text-sm text-gray-400">
                                {service.description}
                            </p>
                        </div>

                        <div className="flex items-center justify-between">
                            <p className="text-sm font-bold text-primary">
                                {Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                }).format(Number(service.price))}
                            </p>

                            <Sheet
                                open={isBookingSheetOpen}
                                onOpenChange={handleBookingSheetOpenChange}
                            >
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={handleBookingClick}
                                >
                                    Reservar
                                </Button>
                                <SheetContent className="w-[90%] px-0">
                                    <SheetTitle className="px-5">
                                        Fazer Reserva
                                    </SheetTitle>

                                    <div className="border-b border-solid py-5">
                                        <Calendar
                                            mode="single"
                                            locale={ptBR}
                                            selected={selectedDay}
                                            onSelect={handleDateSelected}
                                            fromDate={new Date()}
                                            styles={{
                                                head_cell: {
                                                    width: "100%",
                                                    textTransform: "capitalize",
                                                },
                                                cell: {
                                                    width: "100%",
                                                },
                                                button: {
                                                    width: "100%",
                                                },
                                                nav_button_previous: {
                                                    width: "32px",
                                                    height: "32px",
                                                },
                                                nav_button_next: {
                                                    width: "32px",
                                                    height: "32px",
                                                },
                                                caption: {
                                                    textTransform: "capitalize",
                                                },
                                            }}
                                        />
                                    </div>

                                    {selectedDay && (
                                        <div className="flex gap-3 overflow-x-auto border-b border-solid p-5 [&::-webkit-scrollbar]:hidden">
                                            {timeList.length > 0 ? (
                                                timeList.map((time) => (
                                                    <Button
                                                        key={time}
                                                        variant={
                                                            selectedTime ===
                                                            time
                                                                ? "default"
                                                                : "outline"
                                                        }
                                                        className="rounded-full"
                                                        onClick={() =>
                                                            handleSelectTime(
                                                                time,
                                                            )
                                                        }
                                                    >
                                                        {time}
                                                    </Button>
                                                ))
                                            ) : (
                                                <p className="text-xs text-gray-400">
                                                    Não há horários disponíveis
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {selectedDate && (
                                        <div className="p-5">
                                            <BookingSumary
                                                barbershop={barbershop}
                                                service={JSON.parse(
                                                    JSON.stringify(service),
                                                )}
                                                selectedDate={selectedDate}
                                            />
                                        </div>
                                    )}

                                    <SheetFooter className="mt-5 px-5">
                                        <Button
                                            onClick={handleCreateBooking}
                                            type="submit"
                                            disabled={
                                                !selectedTime || !selectedDay
                                            }
                                        >
                                            Confirmar
                                        </Button>
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Dialog
                open={isSignInDialogOpen}
                onOpenChange={(open) => setIsSignInDialogOpen(open)}
            >
                <DialogContent className="w-[90%]">
                    <SignInDialog />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ServiceItem
