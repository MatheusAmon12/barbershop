import { Button } from "./ui/button"

export const EmptyBarbershopsListFallback = () => {
    return (
        <div className="container flex h-svh w-full flex-col items-center justify-center gap-10">
            <div className="space-y-3 text-center lg:w-1/2">
                <h4 className="text-4xl font-bold text-white">
                    Nenhuma barbearia encontrada.
                </h4>
                <p className="text-base font-medium text-muted-foreground">
                    Crie a sua própria barberia para começar a divulgar seus
                    serviços e alavancar seu negócio ou compartilhe com seu
                    barbeiro favorito para que ele comece a divulgar seus
                    serviços por aqui.
                </p>
            </div>
            <div className="flex items-center justify-center gap-4">
                <Button variant="default">Criar barbearia</Button>
                <Button variant="outline">
                    Compartilhar com outro barbeiro
                </Button>
            </div>
        </div>
    )
}
