import { memo, useEffect, useState } from "react";
import { getReq, putReq } from '../../function/API';
import { authPage } from '../../middleware/authrizationPage'
import Link from 'next/link';
import Router from "next/router";
import FormPesan from "../../components/pesan/formPesan";
import Bubble from "../../components/pesan/bubble";
import Nav2 from "../../components/navigasi/nav2";
import { socket } from "../../function/socket";

export const getServerSideProps = async (ctx) => {
    const { token, id_user } = await authPage(ctx)
    let id_chat = ctx.query.id_chat ? ctx.query.id_chat : null
    let result = []
    const balikId = id_chat.split('$')
    const newId_chat = `${balikId[1]}$${balikId[0]}`

    const { res } = id_chat !== null && await getReq('chat/with', id_chat, token)
    if (!res.length < 1) result = res
    else {
        id_chat = newId_chat
        await getReq('chat/with', id_chat, token)
            .then(json => result = json.res)
    }

    return {
        props: {
            id_userMe: id_user,
            token,
            result,
            id_chat,
        }
    }
}

const index = (props) => {
    const [person, setperson] = useState(props.result)
    const [lawan, setlawan] = useState({ nama_user: '', id_user: 0 })
    const [msgLoad, setmsgLoad] = useState(false)

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

        socket.on('loadDB', () => {
            loadMsg()
            setmsgLoad(true)
        })
        loadMsg()
        window.scrollTo(0, document.body.scrollHeight);

        // buat fungsi 'pesan dibaca'
        await putReq('chat/message/read', props.id_userMe, props.token, {
            id_chat: props.id_chat
        }).then(res => null)
        
        let id_user2 = []
        const pisahIdUser = props.id_chat.split('$')
        await pisahIdUser.map(id => id != props.id_userMe && id_user2.push(id))
        for (let i = 0; i < person.length; i++) {
            if (person[i].id_user === id_user2[0]) {
                person[i].nama_user && setlawan({nama_user: person[i].nama_user, id_user: person[i].id_user})
                break;
            }
        }
        if (!lawan || lawan===null || lawan.id_user === 0) {
            const { res } = await getReq('user', id_user2[0], props.token)
            setlawan({nama_user: res.nama_user, id_user: res.id_user})
        }
    }, [])
    
    const loadMsg = async () => {
        if (!msgLoad) {
            await getReq('chat/with', props.id_chat, props.token).then(res => setperson(res.res))
            setmsgLoad(true)
            setTimeout(() => {
                setmsgLoad(false)
            }, 6000);
        }
        
    }

    return (<>
        <Nav2 title={lawan.nama_user && lawan.nama_user}>
            <Link href={`/profil/${lawan.id_user}`} />
        </Nav2>
        <Bubble person={person} id_userMe={props.id_userMe} />
        <FormPesan person={person} token={props.token} id_chat={props.id_chat} id_userMe={props.id_userMe} lawan={lawan.id_user} />
    </>)
}

export default memo(index)