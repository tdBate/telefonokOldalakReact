import type { Phone } from "./models";

export async function loadData() {
    try {
        const response = await fetch("http://localhost:3000/phones");
        const data = await response.json() as Phone[];
        return data;
    } catch (e) {
        console.log(e);
    }
}

export async function pushData(phone: Phone) {
    try {
        const response = await fetch("http://localhost:3000/phones"
            , {
                "method": "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(phone)
            }
        );
        const data = await response.json() as Phone;
        return data;
    } catch (e) {
        console.log(e);
    }

}