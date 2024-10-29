"use client"

import { Barbershop } from "@prisma/client"
import { useRef } from "react"
import BarbershopItem from "./barbershop-item"
import { Button } from "./ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

interface BarbershopCarouselProps {
    barbershops: Barbershop[]
}

const BarbershopCarousel = ({ barbershops }: BarbershopCarouselProps) => {
    const carouselRef = useRef<HTMLDivElement>(null)

    const handleCarouselScroll = (direction: string) => {
        if (!carouselRef.current) return

        carouselRef.current.scrollBy({
            left: direction === "left" ? -220.8 : 220.8,
            behavior: "smooth",
        })
    }

    return (
        <div className="relative hidden lg:block lg:min-w-[617px]">
            <h2 className="mb-3 text-sm font-bold uppercase text-gray-400">
                Recomendados
            </h2>
            <Button
                onClick={() => handleCarouselScroll("left")}
                variant="outline"
                className="absolute -left-4 top-1/2 z-10 h-[55px] w-[55px] -translate-y-1/2 rounded-full"
            >
                <ChevronLeftIcon />
            </Button>
            <div
                ref={carouselRef}
                className="flex flex-row gap-4 overflow-auto [&::-webkit-scrollbar]:hidden"
            >
                {barbershops.map((barbershop) => (
                    <BarbershopItem
                        key={barbershop.id}
                        barbershop={barbershop}
                    />
                ))}
            </div>
            <Button
                onClick={() => handleCarouselScroll("right")}
                variant="outline"
                className="absolute -right-4 top-1/2 z-10 h-[55px] w-[55px] -translate-y-1/2 rounded-full"
            >
                <ChevronRightIcon />
            </Button>
        </div>
    )
}

export default BarbershopCarousel
