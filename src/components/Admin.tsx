import { useEffect, useState } from "react"
import { deleteItem, loadData, modifyItem, pushData } from "../utility"
import type { Phone } from "../models"

export function Admin() {
    const [telefonok, setTelefonok] = useState<Phone[]>([]);

    const [nev, setNev] = useState<string>("");
    const [ar, setAr] = useState<number>(0);
    const [raktaron, setRaktaron] = useState<boolean>(false);
    const [datum, setDatum] = useState<Date>(new Date());

    useEffect(() => {
        async function init() {
            setTelefonok(await loadData() ?? []);
        }

        init();

    }, [])

    async function handlePost(e) {
        e.preventDefault();
        const ujPhone: Phone = {
            nev: nev,
            ar: ar,
            raktaron: raktaron,
            kiadasDatuma: datum.toLocaleDateString("sv-SE")
        }

        const resPhone: Phone = (await pushData(ujPhone))!;
        setTelefonok([...telefonok, resPhone])
    }

    async function handleTorles(id: string) {
        await deleteItem(id);

        setTelefonok(telefonok.filter(item => item.id != id))
    }

    async function flipRaktaron(phone: Phone) {
        phone.raktaron = !phone.raktaron;
        await modifyItem(phone);

        const ujTelefonok = [...telefonok];
        const index = ujTelefonok.findIndex(allat => allat.id == phone.id);
        ujTelefonok[index].raktaron = phone.raktaron;
        setTelefonok(ujTelefonok);
    }

    return (<>
        <form>
            <label>Név</label>
            <input value={nev} onChange={(e) => setNev(e.target.value)} type="text" /><br />

            <label htmlFor="">Ár</label>
            <input value={ar} onChange={(e) => setAr(parseInt(e.target.value))} type="number" /><br />

            <label htmlFor="">Raktáron</label>
            <input checked={raktaron} onChange={(e) => setRaktaron(e.target.checked)} type="checkbox" /><br />

            <label htmlFor="">Kiadás dátuma</label>
            <input value={datum.toLocaleDateString("sv-SE")} onChange={(e) => setDatum(new Date(e.target.value))} type="date" /> <br />

            <button type="submit" onClick={handlePost}>Submit</button>
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
                        <td>
                            {item.ar}
                            <div>
                                <button>+</button>
                                <button>-</button>
                            </div>
                        </td>
                        <td><button onClick={() => { flipRaktaron(item) }}>{item.raktaron ? "igen" : "nem"}</button></td>
                        <td>{item.kiadasDatuma}</td>
                        <td><button onClick={() => { handleTorles(item.id!) }}>Törlés</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>)
}