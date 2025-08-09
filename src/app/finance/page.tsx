'use client'

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import FinanceEditor from "@/features/finance/FinanceEditor";

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

            <FinanceEditor />
        </div>
    );
}
