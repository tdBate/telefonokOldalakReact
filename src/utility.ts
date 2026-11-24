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