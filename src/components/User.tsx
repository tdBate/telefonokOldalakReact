import { useEffect, useState } from "react"
import { loadData } from "../utility"
import type { Phone } from "../models"

export function User() {
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
                                    </td>
                                    <td>{item.raktaron ? "igen" : "nem"}</td>
                                    <td>{item.kiadasDatuma}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div >
    </>)
}