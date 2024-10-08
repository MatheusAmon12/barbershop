import { db } from "../_lib/prisma"

export const getPopularBarbershops = async () => {
    return db.barbershop.findMany({
        orderBy: {
            name: "desc",
        },
    })
}
