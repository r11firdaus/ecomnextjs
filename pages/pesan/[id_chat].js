import { memo, useEffect, useState } from "react";
import { getReq, putReq } from '../../function/API';
import { authPage } from '../../middleware/authrizationPage'
import Link from 'next/link';
import Router from "next/router";
import FormPesan from "../../components/pesan/formPesan";
import Bubble from "../../components/pesan/bubble";
import Nav2 from "../../components/navigasi/nav2";
import { socket } from "../../function/socket";
import { useDispatch } from "react-redux";

export const getServerSideProps = async (ctx) => {
    const { token, id_user } = await authPage(ctx)
    let id_chat = ctx.query.id_chat && ctx.query.id_chat
    let result = []
    const pisahIdUser = id_chat.split('$')

    const { res } = id_chat !== null && await getReq('chat/with', id_chat, token)
    if (res.length > 0) result = res
    else {
        const newId_chat = `${pisahIdUser[1]}$${pisahIdUser[0]}`
        await getReq('chat/with', newId_chat, token).then(json => result = json.res)
    }

    let id_user2 = []
    let lawan={}
    await pisahIdUser.map(id => id != id_user && id_user2.push(id))
    if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
            if (result[i].id_user == id_user2[0]) {
                lawan = { nama_user: result[i].nama_user, id_user: result[i].id_user }
                break;
            }
        }
    } else {
        const { res } = await getReq('user', id_user2[0], token)
        lawan = { nama_user: res.nama_user, id_user: res.id_user }
    }

    return {
        props: {
            id_userMe: id_user,
            lawan,
            token,
            result,
            id_chat,
        }
    }
}

const index = (props) => {
    console.log(props.lawan)
    const [person, setperson] = useState(props.result)
    const [msgLoad, setmsgLoad] = useState(false)
    const dispatch = useDispatch()

    // sepertinya chat terlalu banyak menggunakan koneksi db, kurangi !
    // mungkin untuk status message (read, unread, sent) cukup pakai websocket (tanpa connect ke db)
    // kedepannya bisa dicoba message juga hanya menggunakan websocket tanpa db
    // atau tetap konek de db hanya jika ada pesan baru (pesan yg bulum dibaca)

    socket.on('chat message', async (message, id_chat, receiver_user, sender) => {
        if (props.id_chat === id_chat) {
            let newPerson = [...person];
            let newMsg = { id_user: sender, receiver_user, message }
            newPerson.push(newMsg)
            setperson(newPerson)
            await putReq('chat/message/read', props.id_userMe, props.token, {
                id_chat: props.id_chat
            }).then(res => null)
        }
    });


    useEffect(async () => {
        Router.replace(`/pesan/${props.id_chat}`);
        dispatch({type: 'SITE_PAGE', payload: ''})

        socket.on('loadDB', () => loadMsg())
        window.scrollTo(0, document.body.scrollHeight);

        // buat fungsi 'pesan dibaca'
        await putReq('chat/message/read', props.id_userMe, props.token, {
            id_chat: props.id_chat
        }).then(res => null)
    }, [])

    const loadMsg = async () => {
        if (!msgLoad) {
            await getReq('chat/with', props.id_chat, props.token).then(res => setperson(res.res))
            setmsgLoad(true)
            console.warn('msg loaded')
            setTimeout(() => {
                setmsgLoad(false)
            }, 6000);
        }

    }

    return (<>
        <Nav2 title={props.lawan.nama_user}>
            {/* <Link href={`/profil/${props.lawan.id_user}`} /> */}
        </Nav2>
        
        <Bubble person={person} id_userMe={props.id_userMe} />
        <FormPesan person={person} token={props.token} id_chat={props.id_chat} id_userMe={props.id_userMe} lawan={props.lawan.id_user} />
    </>)
}

export default memo(index)