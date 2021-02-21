import { memo, useEffect, useState } from "react";
import { getReq } from '../function/API';
import Link from 'next/link';
import cookie from 'js-cookie';
import io from "socket.io-client";
const socket = io("http://localhost:3001/");

const tes = () => {
    const [person, setperson] = useState([])

    useEffect(async () => {
        const token = cookie.get('token')
        const id_user = cookie.get('id_user')

        const { res } = await getReq('chat', id_user, token)
        setperson(res)
        console.log(res)

        // buat fungsi 'pesan dibaca'
    }, [])

    return (
        <>
            <ul id="messages">
                {
                    person.map(per => (
                        <Link href={`/tes/${per.id_chat}`} key={per.id_chat}><li>{per.nama_user}</li></Link>
                    ))
                }
            </ul>
        </>
    )
}

export default memo(tes)