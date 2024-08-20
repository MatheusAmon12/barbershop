import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"

// TODO: receber agendamento com props
const BookingItem = () => {
    return (
        <>
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
        </>
    )
}

export default BookingItem
