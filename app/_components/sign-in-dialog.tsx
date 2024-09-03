import Image from "next/image"
import { Button } from "./ui/button"
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { signIn } from "next-auth/react"

const SignInDialog = () => {
    const handleClickSignInGoogle = () => {
        signIn("google")
    }

    return (
        <>
            <DialogHeader>
                <DialogTitle>Faça login na plataforma</DialogTitle>
                <DialogDescription>
                    Conecte-se usando sua conta do Google.
                </DialogDescription>
            </DialogHeader>

            <Button
                variant="outline"
                className="gap-1 font-bold"
                onClick={handleClickSignInGoogle}
            >
                <Image
                    src="/google.svg"
                    width={18}
                    height={18}
                    alt="Entre com o Google"
                />
                Google
            </Button>
        </>
    )
}

export default SignInDialog
