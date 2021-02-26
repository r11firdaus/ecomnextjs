import { memo, useEffect, useState } from "react";
import { getReq } from '../../function/API';
import Nav2 from '../../components/navigasi/nav2';
import BottomNav from '../../components/navigasi/bottomNav';
import Link from 'next/link';
import cookie from 'js-cookie';
import io from "socket.io-client";
const socket = io("http://localhost:3001/");

const index = () => {
    const [person, setperson] = useState([])

    useEffect(async () => {
        const token = cookie.get('token')
        const id_user = cookie.get('id_user')

        const { res } = await getReq('chat', id_user, token)
        setperson(res)

        // buat fungsi 'pesan dibaca'
    }, [])

    return (
        <>
            <Nav2 title="Messages" />
            <ul id="messages" style={{margin: '3.75rem 0'}}>
                {
                    person.map(per => (
                        <Link href={`/pesan/${per.id_chat}`} key={per.id_chat}><li>{per.nama_user}</li></Link>
                    ))
                }
            </ul>
            <BottomNav hal="pesan" />
        </>
    )
}

export default memo(index)