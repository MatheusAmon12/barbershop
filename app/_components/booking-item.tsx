"use client"

import { Prisma } from "@prisma/client"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet"
import Image from "next/image"
import PhoneItem from "./phone-item"
import { Button } from "./ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"
import { deleteBooking } from "../_actions/delete-booking"
import { toast } from "sonner"
import { useState } from "react"
import BookingSumary from "./booking-sumary"

// TODO: receber agendamento com props
interface BookingItemProps {
    booking: Prisma.BookingGetPayload<{
        include: {
            service: {
                include: {
                    barbershop: true
                }
            }
        }
    }>
}

const BookingItem = ({ booking }: BookingItemProps) => {
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const {
        service: { barbershop },
    } = booking
    const isConfirmed = isFuture(booking.date)

    const handleCancelBooking = async () => {
        try {
            await deleteBooking(booking.id)
            setIsSheetOpen(false)
            toast.success("Reserva cancelada com sucesso!")
        } catch (error) {
            toast.error("Erro ao cancelar reserva! Tente novamente.")
        }
    }

    const handleSheetOpenChange = (isOpen: boolean) => {
        setIsSheetOpen(isOpen)
    }

    return (
        <>
            <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
                <SheetTrigger className="w-full" asChild>
                    <Card className="min-w-[90%]">
                        <CardContent className="flex flex-row justify-between p-0">
                            <div className="flex flex-col gap-2 py-5 pl-5">
                                <Badge
                                    className="w-fit"
                                    variant={
                                        isConfirmed ? "default" : "secondary"
                                    }
                                >
                                    {isConfirmed ? "Confirmado" : "Finalizado"}
                                </Badge>
                                <h3 className="font-semibold">
                                    {booking.service.name}
                                </h3>
                                <div className="flex flex-row items-center gap-1">
                                    <Avatar className="h-6 w-6">
                                        <AvatarImage
                                            src={
                                                booking.service.barbershop
                                                    .imageUrl
                                            }
                                        />
                                    </Avatar>
                                    <p className="text-sm">
                                        {booking.service.barbershop.name}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
                                <p className="text-sm capitalize">
                                    {format(booking.date, "MMMM", {
                                        locale: ptBR,
                                    })}
                                </p>
                                <p className="text-xl">
                                    {format(booking.date, "dd", {
                                        locale: ptBR,
                                    })}
                                </p>
                                <p className="text-sm">
                                    {format(booking.date, "HH:mm", {
                                        locale: ptBR,
                                    })}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </SheetTrigger>
                <SheetContent className="w-[90%]">
                    <SheetHeader>
                        <SheetTitle className="text-left">
                            Informações da Reserva
                        </SheetTitle>
                    </SheetHeader>

                    <div className="relative mt-6 flex h-[180px] w-full items-end justify-center p-5">
                        <Image
                            src="/map.png"
                            alt={`Mapa da barbearia ${barbershop.name}.png`}
                            fill
                            className="rounded-xl object-cover"
                        />

                        <Card className="z-10 w-full">
                            <CardContent className="justify-left flex items-center gap-3 px-5 py-3">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage
                                        src={barbershop.imageUrl}
                                        alt={barbershop.name}
                                    />
                                </Avatar>
                                <div>
                                    <h2 className="font-bold">
                                        {barbershop.name}
                                    </h2>
                                    <p className="overflow-clip text-ellipsis text-nowrap text-xs">
                                        {barbershop.address}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-6">
                        <Badge
                            className="w-fit"
                            variant={isConfirmed ? "default" : "secondary"}
                        >
                            {isConfirmed ? "Confirmado" : "Finalizado"}
                        </Badge>
                    </div>

                    <div className="mb-3 mt-6">
                        <BookingSumary
                            barbershop={barbershop}
                            service={JSON.parse(
                                JSON.stringify(booking.service),
                            )}
                            selectedDate={booking.date}
                        />
                    </div>

                    <div className="space-y-3">
                        {barbershop.phones.map((phone) => (
                            <PhoneItem key={phone} phone={phone} />
                        ))}
                    </div>
                    <SheetFooter className="mt-6">
                        <div className="flex items-center gap-3">
                            <SheetClose asChild>
                                <Button variant="outline" className="w-full">
                                    Voltar
                                </Button>
                            </SheetClose>
                            {isConfirmed && (
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="destructive"
                                            className="w-full"
                                        >
                                            Cancelar Reserva
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="w-[90%]">
                                        <DialogHeader>
                                            <DialogTitle>
                                                Cancelar Reserva
                                            </DialogTitle>
                                            <DialogDescription>
                                                Tem certeza que deseja cancelar
                                                esta reserva? Essa ação é
                                                irreversível.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter className="flex flex-row gap-3">
                                            <DialogClose asChild>
                                                <Button
                                                    variant="secondary"
                                                    className="w-full"
                                                >
                                                    Cancelar
                                                </Button>
                                            </DialogClose>
                                            <DialogClose asChild>
                                                <Button
                                                    variant="destructive"
                                                    className="w-full"
                                                    onClick={
                                                        handleCancelBooking
                                                    }
                                                >
                                                    Confirmar
                                                </Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            )}
                        </div>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </>
    )
}

export default BookingItem
