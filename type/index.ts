import { CSSProperties } from "react";

interface id_user {id_user?: string|number}
interface token {token?: string}

export interface MyIdAndToken extends id_user, token {}

export interface ParamsAPI extends MyIdAndToken {
    path: string,
    id: string | number,
    data?: any,
    sort?: string | undefined
}

export interface StylesDictionary {
    [Key: string]: CSSProperties;
}

export interface GlobalState extends MyIdAndToken {
    unreadMessage?: number,
    page?: string,
    cart?: number,
    notification?: number,
    cod?: boolean,
    modalFilter?: boolean,
    dbloaded?: boolean
}

export interface UserData extends MyIdAndToken {
    alamat_user: string,
    email_user: string,
    kecamatan_user: string,
    kota_user: string,
    nama_user: string,
    provinsi_user: string,
    telepon_user: string,
    password_user?: string
}