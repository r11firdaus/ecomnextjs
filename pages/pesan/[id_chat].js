import { memo, useEffect, useState } from "react";
import { getReq } from '../../function/API';
import { authPage } from '../../middleware/authrizationPage'
import Link from 'next/link';
import Router from "next/router";
import FormPesan from "../../components/pesan/formPesan";
import io from "socket.io-client";
import Bubble from "../../components/pesan/bubble";
const socket = io("http://localhost:3001/");

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
    const [lawan, setlawan] = useState('')
    
    socket.on('chat message', async (msg, id) => {
        if (props.id_chat === id) {
            const { res } = await getReq('chat/with', props.id_chat, props.token)
            setperson(res)
        }
    });
    
    useEffect(async () => {
        Router.replace(`/pesan/${props.id_chat}`);
        window.scrollTo(0, document.body.scrollHeight);
        
        let id_user2 = []
        const pisahIdUser = props.id_chat.split('$')
        await pisahIdUser.map(id => {
            id != props.id_userMe && id_user2.push(id)
        })
        const {res} = await getReq('user', id_user2[0], props.token)
        setlawan(res.nama_user)
        // buat fungsi 'pesan dibaca'
    }, [])

    return (<>
        <div style={styles.header}>
            <strong>{lawan}</strong>
        </div>
        <Bubble person={person} id_userMe={props.id_userMe} />
        <FormPesan person={person} token={props.token} id_chat={props.id_chat} id_userMe={props.id_userMe} />
    </>)
}

const styles = {
    header: {
        display: 'flex',
        padding: '10px',
        position: 'fixed',
        width: '100%',
        height: '3rem',
        background: 'white',
        borderBottom: '1px grey solid'
    },    
}

export default memo(index)