import type { Phone } from "./models";

const BASE_URL = "http://localhost:3000/phones";

export async function loadData() {
    try {
        const response = await fetch(BASE_URL);
        const data = await response.json() as Phone[];
        return data;
    } catch (e) {
        console.log(e);
    }
}

export async function pushData(phone: Phone) {
    try {
        const response = await fetch(BASE_URL
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

export async function deleteItem(id: string) {
    try {
        fetch(BASE_URL + "/" + id, {
            method: 'DELETE'
        })
    } catch (e) {
        console.log(e);
    }

}

export async function modifyItem(phone: Phone) {
    try {
        const response = await fetch(BASE_URL + "/" + phone.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(phone),
        });
    } catch (e) {
        console.log(e);
    }
}