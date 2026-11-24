import { useEffect, useState } from "react"
import { loadData } from "../utility"
import type { Phone } from "../models"

export function Admin() {
    const [telefonok, setTelefonok] = useState<Phone[]>([]);

    const [nev, setNev] = useState("");
    const [ar, setAr] = useState<number>(0);
    const [raktaron, setRaktaron] = useState(false);
    const [datum, setDatum] = useState(new Date());

    useEffect(() => {
        async function init() {
            setTelefonok(await loadData() ?? []);
        }

        init();

    }, [])

    return (<>
        <form>
            <label>Név</label>
            <input value={nev} onChange={(e) => setNev(e.target.value)} type="text" /><br />

            <label htmlFor="">Ár</label>
            <input value={ar} onChange={(e) => setAr(parseInt(e.target.value))} type="number" /><br />

            <label htmlFor="">Raktáron</label>
            <input value={raktaron ? "checked" : ""} onChange={(e) => setRaktaron(e.target.value == "checked" ? true : false)} type="checkbox" /><br />

            <label htmlFor="">Kiadás dátuma</label>
            <input value={datum.toLocaleDateString("sv-SE")} onChange={(e) => setDatum(new Date(e.target.value))} type="date" />
        </form>

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