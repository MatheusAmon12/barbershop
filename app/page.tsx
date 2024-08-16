import { SearchIcon } from "lucide-react"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"

const Home = () => {
    return (
        <>
            <Header />

            <section className="p-5">
                <h2 className="text-xl font-bold">Olá, Matheus!</h2>
                <span>Sexta-feira, 16 de Agosto</span>

                <div className="mt-6 flex flex-row gap-2">
                    <Input placeholder="Faça sua busca..." />
                    <Button variant="default">
                        <SearchIcon />
                    </Button>
                </div>

                <div className="relative mt-6 h-[150px] w-full">
                    <Image
                        alt="Agende nos melhores com o FSW Barber"
                        src="/BannerPizza.png"
                        fill
                        className="rounded-xl object-cover"
                    />
                </div>
            </section>
        </>
    )
}

export default Home
