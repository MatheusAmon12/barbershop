export const formatPriceInCentsToBRL = (priceInCents: number) => {
    const princeInBRL = priceInCents / 100

    return Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(princeInBRL)
}
