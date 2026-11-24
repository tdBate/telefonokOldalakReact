import { useEffect, useState } from "react"
import { loadData } from "../utility"
import type { Phone } from "../models"

export function Admin() {
    const [telefonok, setTelefonok] = useState<Phone[]>([]);

    useEffect(() => {
        async function init() {
            setTelefonok(await loadData() ?? []);
        }

        init();

    }, [])

    return (<>

    </>)
}