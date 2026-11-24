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
        <table>
            <thead>
                <th>Nev</th>
                <th>Ar</th>
                <th>Raktaron</th>
                <th>Kiadas datuma</th>
            </thead>

            <tbody>
                {telefonok.map(item => (
                    <tr key={item.id}>
                        <td>{item.nev}</td>
                        <td>{item.ar}</td>
                        <td>{item.raktaron ? "igen" : "nem"}</td>
                        <td>{item.kiadasDatuma}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>)
}