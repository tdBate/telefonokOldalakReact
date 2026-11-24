import { useEffect, useState } from "react"
import { loadData, modifyItem } from "../utility"
import type { Phone } from "../models"

export function Mod() {
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

    async function flipRaktaron(phone: Phone) {
        phone.raktaron = !phone.raktaron;
        await modifyItem(phone);

        const ujTelefonok = [...telefonok];
        const index = ujTelefonok.findIndex(allat => allat.id == phone.id);
        ujTelefonok[index] = phone;
        setTelefonok(ujTelefonok);
    }

    async function modositAr(phone: Phone, ertek: number) {
        phone.ar += ertek;
        await modifyItem(phone);

        const ujTelefonok = [...telefonok];
        const index = ujTelefonok.findIndex(item => item.id == phone.id);
        ujTelefonok[index] = phone;
        setTelefonok(ujTelefonok);
    }

    return (<>
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <table className="table table-striped">
                        <thead className="the">
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
                                            <button className="btn" onClick={() => modositAr(item, 1)}>+</button>
                                            <button className="btn" onClick={() => modositAr(item, -1)}>-</button>
                                        </div>
                                    </td>
                                    <td><button className="btn btn-success" onClick={() => { flipRaktaron(item) }}>{item.raktaron ? "igen" : "nem"}</button></td>
                                    <td>{item.kiadasDatuma}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </>)
}