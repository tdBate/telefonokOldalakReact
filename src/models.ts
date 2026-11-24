export interface Phone {
    id?: string
    nev: string
    ar: number
    raktaron: boolean
    kiadasDatuma: string
}

export type View = "admin" | "mod" | "user";