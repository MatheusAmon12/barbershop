import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"
import BookingItem from "../_components/booking-item"
import { getConfirmedBookings } from "../_data/get-confirmed-bookings"
import { getConcludedBookings } from "../_data/get-concluded-bookings"
import { Button } from "../_components/ui/button"
import Link from "next/link"
import { redirect } from "next/navigation"

const Bookings = async () => {
    const session = await getServerSession(authOptions)

    const confirmedBookings = await getConfirmedBookings()
    const concludedBookings = await getConcludedBookings()

    const getConfirmedBookingsSection = () =>
        confirmedBookings.length > 0 ? (
            <>
                {confirmedBookings.map((booking) => (
                    <BookingItem
                        key={booking.id}
                        booking={JSON.parse(JSON.stringify(booking))}
                    />
                ))}
            </>
        ) : (
            <div className="flex flex-col items-start gap-4">
                <p className="text-gray-400">Você não possui agendamentos.</p>
                <Button asChild>
                    <Link href="/"> Ver barbearias disponíveis</Link>
                </Button>
            </div>
        )

    const getConcludedBookingsSection = () =>
        concludedBookings.length > 0 ? (
            <>
                {concludedBookings.map((booking) => (
                    <BookingItem
                        key={booking.id}
                        booking={JSON.parse(JSON.stringify(booking))}
                    />
                ))}
            </>
        ) : (
            <p className="text-gray-400">
                Você não possui agendamentos finalizados.
            </p>
        )

    if (!session) {
        redirect("/")
    }

    return (
        <div className="flex flex-col gap-3 p-5 lg:container">
            <h1 className="text-2xl font-bold">Agendamentos</h1>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                <div className="flex flex-col gap-3">
                    <h2 className="mb-3 mt-6 text-sm font-bold uppercase text-gray-400">
                        Confirmados
                    </h2>
                    {getConfirmedBookingsSection()}
                </div>

                <div className="flex flex-col gap-3">
                    <h2 className="mb-3 mt-6 text-sm font-bold uppercase text-gray-400">
                        Finalizados
                    </h2>
                    {getConcludedBookingsSection()}
                </div>
            </div>
        </div>
    )
}

export default Bookings
