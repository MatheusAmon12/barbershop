import { db } from "../_lib/prisma"

interface getBarbershopByIdProps {
    params: {
        id: string
    }
}

export const getBarbershopById = async ({ params }: getBarbershopByIdProps) => {
    return db.barbershop.findUnique({
        where: {
            id: params.id,
        },
        include: {
            services: true,
        },
    })
}
