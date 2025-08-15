//TODO

import { Barbershop, BarbershopService } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { formatPriceInCentsToBRL } from "../utils/currency"

interface BookingSumaryProps {
    service: Pick<BarbershopService, "name" | "priceInCents">
    barbershop: Pick<Barbershop, "name">
    selectedDate: Date
}

const BookingSumary = ({
    service,
    barbershop,
    selectedDate,
}: BookingSumaryProps) => {
    return (
        <Card className="p-3">
            <CardContent className="space-y-3 p-0">
                <div className="flex items-center justify-between">
                    <h2 className="font-bold">{service?.name}</h2>
                    <p className="text-sm font-bold">
                        {formatPriceInCentsToBRL(service?.priceInCents ?? 0)}
                    </p>
                </div>

                <div className="flex items-center justify-between text-gray-400">
                    <h2 className="text-sm">Data</h2>
                    <p className="text-sm">
                        {format(selectedDate ?? new Date(), "d 'de' MMMM", {
                            locale: ptBR,
                        })}
                    </p>
                </div>

                <div className="flex items-center justify-between text-gray-400">
                    <h2 className="text-sm">Horário</h2>
                    <p className="text-sm">
                        {format(selectedDate ?? new Date(), "HH:mm")}
                    </p>
                </div>

                <div className="flex items-center justify-between text-gray-400">
                    <h2 className="text-sm">Barbearia</h2>
                    <p className="text-sm">{barbershop?.name}</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default BookingSumary
