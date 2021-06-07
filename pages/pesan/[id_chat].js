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
import {loadMsg} from '../../function/loadData';
import { socketMsg } from "../../function/socketAction";

export const getServerSideProps = async (ctx) => {
    const { token, id_user } = await authPage(ctx)
    let id_chat = ctx.query.id_chat ? ctx.query.id_chat : ctx.res.writeHead(302, {location: '/pesan'}).end()

    const pisahIdUser = id_chat.split('$')
    let chkId = []
    await pisahIdUser.map(id => id_user == parseInt(id) && chkId.push(id))
    if (chkId.length < 1) ctx.res.writeHead(302, {location: '/pesan'}).end()

    return {
        props: {
            id_userMe: id_user,
            token,
            id_chat,
        }
    }
}

const index = (props) => {
    const [person, setperson] = useState([]);
    const [lawanChat, setlawanChat] = useState({nama_user: '', id_user: 0});
    const dispatch = useDispatch();
    let idCht = props.id_chat;

    useEffect(async () => {
        await loadChat()
        dispatch({ type: 'SITE_PAGE', payload: 'chats' })
        window.scrollTo(0, document.body.scrollHeight);
        
        // buat fungsi 'pesan dibaca'
        let unread = [];
        person.map(psn => {
            if (psn.id_chat == idCht && psn.receiver == props.id_userMe && psn.status_message === "unread") {
                unread.push(psn)
            }
        })

        if (unread.length > 0) {
            await putReq('chat/message/read', props.id_userMe, props.token, {
                id_chat: props.id_chat
            })
        }

        socket.on('chat message', async (message, id_chat, receiver_user, sender) => {
            if (idCht === id_chat) {
                const newMsg = {
                    id_chat,
                    id_user: parseInt(sender),
                    receiver_user: receiver_user,
                    message,
                    status_message: 'read',
                }
                await socketMsg(newMsg, 'chats', props.id_userMe, props.token, id_chat)
                await loadChat()
            }
        });
    }, [])

    const loadChat = async () => {
        let result = []
        const pisahIdUser = props.id_chat.split('$')
        const newId_chat = `${pisahIdUser[1]}$${pisahIdUser[0]}`

        const {msg} = await loadMsg(props.id_userMe, props.token)

        if (msg.length > 0) {
            await msg.map(cht => cht.id_chat == idCht && result.push(cht))
            if (result.length < 1 && props.id_chat != newId_chat) {
                idCht = newId_chat;
                Router.replace(`/pesan/${newId_chat}`);
                await msg.map(cht => cht.id_chat == idCht && result.push(cht))
            }
        }
        setperson(result.reverse())
        findLawan(result.reverse())
    }

    const findLawan = async (data) => {
        const pisahIdUser = idCht.split('$')
        let id_user2 = []
        let lawan = {}
        await pisahIdUser.map(id => id != props.id_userMe && id_user2.push(parseInt(id)))
        
        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].nama_user && data[i].id_user === id_user2[0]) {
                    lawan = {
                        nama_user: data[i].nama_user,
                        id_user: data[i].id_user
                    }
                    break;
                }
            }
        }
        
        if (!lawan.nama_user || !lawan.id_user) {
            const { res } = await getReq('user', parseInt(id_user2[0]), props.token)
            lawan = { nama_user: res.nama_user, id_user: res.id_user }
        }
        setlawanChat(lawan)
    }

    return (<>
        <Nav2 title={lawanChat.nama_user}>
            <Link href={`/profil/${lawanChat.id_user}`} />
        </Nav2>

        <Bubble person={person} id_userMe={props.id_userMe} />
        <FormPesan person={person} token={props.token} id_chat={idCht} id_userMe={props.id_userMe} lawan={lawanChat} />
    </>)
}

export default memo(index)