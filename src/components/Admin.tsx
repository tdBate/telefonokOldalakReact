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
                    <form className="form">
                        <label className="form-label">Név</label>
                        <input className="form-control" value={nev} onChange={(e) => setNev(e.target.value)} type="text" /><br />

                        <label className="form-label" htmlFor="">Ár</label>
                        <input className="form-control" value={ar} onChange={(e) => setAr(parseInt(e.target.value))} type="number" /><br />

                        <label className="form-label" htmlFor="">Raktáron: </label>
                        <input className="form-checkbox" checked={raktaron} onChange={(e) => setRaktaron(e.target.checked)} type="checkbox" /><br />

                        <label className="form-label" htmlFor="">Kiadás dátuma</label>
                        <input className="form-control" value={datum.toLocaleDateString("sv-SE")} onChange={(e) => setDatum(new Date(e.target.value))} type="date" /> <br />

                        <button className="btn btn-primary" type="submit" onClick={handlePost}>Submit</button>
                    </form>
                </div>

                <div className="col-sm-12 mt-5">
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
                                    <td><button className="btn btn-danger" onClick={() => { handleTorles(item.id!) }}>Törlés</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </>)
}