"use server"

import { db } from "../_lib/prisma"

interface getSearchedTermsProps {
    searchParams: {
        title?: string
        services?: string
    }
}

export const getSearchedTerms = async ({
    searchParams,
}: getSearchedTermsProps) => {
    return db.barbershop.findMany({
        where: {
            OR: [
                searchParams?.title
                    ? {
                          name: {
                              contains: searchParams?.title,
                              mode: "insensitive",
                          },
                      }
                    : {},
                searchParams?.services
                    ? {
                          services: {
                              some: {
                                  name: {
                                      contains: searchParams?.services,
                                      mode: "insensitive",
                                  },
                              },
                          },
                      }
                    : {},
            ],
        },
    })
}
