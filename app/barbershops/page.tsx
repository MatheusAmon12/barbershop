import BarbershopItem from "../_components/barbershop-item"
import Search from "../_components/search"
import { getSearchedTerms } from "../_data/get-searched-terms"

interface BarbershopsPageProps {
    searchParams: {
        title?: string
        services?: string
    }
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
    const barbershops = await getSearchedTerms({ searchParams })

    return (
        <div className="lg:container">
            <div className="my-6 px-5 lg:hidden">
                <Search />
            </div>
            <div className="px-5">
                <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400 lg:text-xl">
                    Resultados para &quot;
                    {searchParams?.title || searchParams?.services}&quot;
                </h2>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
                    {barbershops.map((barbershop) => (
                        <BarbershopItem
                            key={barbershop.id}
                            barbershop={barbershop}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BarbershopsPage
