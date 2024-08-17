import { Card, CardContent } from "./ui/card"

const Footer = () => {
    return (
        <footer className="mt-12">
            <Card>
                <CardContent className="p-0 px-5 py-6 text-sm text-gray-400">
                    © 2024 Copyright{" "}
                    <span className="font-bold">FSW Barber</span>
                </CardContent>
            </Card>
        </footer>
    )
}

export default Footer
