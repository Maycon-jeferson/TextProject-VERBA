'use client'

import { useRouter } from "next/navigation"
import { Button } from "../../layout/Button" // Certifique-se que esse botão está corretamente implementado
import FinanceEdit from "@/components/FinanceEdit/FinanceEdit";

export default function NewFinance() {
    const router = useRouter();

    const handlePageHome = () => {
        router.push('/');
    };

    return (
        <div className="">
            <div className="">
                <Button onClick={handlePageHome}>
                    Voltar
                </Button>
            </div>

            <FinanceEdit />
        </div>
    );
}
