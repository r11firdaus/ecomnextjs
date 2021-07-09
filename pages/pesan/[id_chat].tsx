import { memo, useEffect, useState } from "react";
import Link from 'next/link';
import Router from "next/router";
import { getReq, putReq } from '../../function/API';
import { socket } from "../../function/socket";
import {loadMsg} from '../../function/loadData';
import { authPage } from '../../middleware/authrizationPage';
import FormPesan from "../../components/pesan/formPesan";
import Bubble from "../../components/pesan/bubble";
import Nav2 from "../../components/navigasi/nav2";
import { GetServerSideProps } from "next";
import { MyIdAndToken } from "../../type";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { token, id_user } = await authPage(ctx)
    let id_chat = ctx.query.id_chat ? ctx.query.id_chat : ctx.res.writeHead(302, {location: '/pesan'}).end()

    const pisahIdUser = (id_chat as string).split('$')
    let chkId = []
    pisahIdUser.map(id => id_user == parseInt(id) && chkId.push(id))
    if (chkId.length < 1) ctx.res.writeHead(302, {location: '/pesan'}).end()

    return {
        props: {
            id_user,
            token,
            id_chat,
        }
    }
}

interface Props extends MyIdAndToken { id_chat: string }
type LawanChat = { id_user: string|number, nama_user: string }

const index = (props: Props): JSX.Element => {
    const [person, setperson] = useState([]);
    const [lawanChat, setlawanChat] = useState<LawanChat>(null);
    let idCht = props.id_chat;

    useEffect(() => {
        loadChat()
        window.scrollTo(0, document.body.scrollHeight);
        
        // buat fungsi 'pesan dibaca'
        let unread = [];
        person.map(psn => {
            if (psn.id_chat == idCht && psn.receiver == props.id_user && psn.status_message === "unread") {
                unread.push(psn)
            }
        })
        processMessage(unread)
           
        socket.on('chat message', async (message: string, id_chat: string) => {
            idCht === id_chat && loadChat();
        })
    }, [])

    const loadChat = async (): Promise<void> => {
        let result = []
        const pisahIdUser = props.id_chat.split('$')
        const newId_chat = `${pisahIdUser[1]}$${pisahIdUser[0]}`

        await loadMsg(props.id_user, props.token).then((res: any) => {
            if (res.msg.length > 0) {
                res.msg.map((cht: any) => cht.id_chat == idCht && result.push(cht))
                if (result.length < 1 && props.id_chat != newId_chat) {
                    idCht = newId_chat;
                    Router.replace(`/pesan/${newId_chat}`);
                    res.msg.map((cht: any) => cht.id_chat == idCht && result.push(cht))
                }
            }
        })

        setperson(result.reverse())
        findLawan(result.reverse())
    }

    const processMessage = async (data: any[]) => {
        if (data.length > 0) {
            let newLocalChat = [];
            const localChat = localStorage.getItem('chats');
            let jsonLocalChat = localChat && JSON.parse(localChat);

            await putReq('chat/message/read', props.id_user, props.token, {id_chat: idCht})
            
            jsonLocalChat.map((jsc: any) => {
                if (jsc.id_chat == idCht && jsc.receiver_user == props.id_user) {
                    jsc.status_message = 'read';
                }
                newLocalChat.push(jsc)
            })
            localStorage.setItem('chats', JSON.stringify(newLocalChat));
        } 
    }

    const findLawan = async (data: any[]): Promise<void> => {
        const pisahIdUser = idCht.split('$');
        let id_user2 = [];
        let lawan: typeof lawanChat;
        pisahIdUser.map(id => id != props.id_user && id_user2.push(parseInt(id)))
        
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
            await getReq('user', parseInt(id_user2[0]), props.token).then((res: typeof lawanChat) => {
                lawan = { nama_user: res.nama_user, id_user: res.id_user }
            })
        }
        setlawanChat(lawan)
    }

    return (<>
        <div style={{marginTop: '-4.5rem', position: 'fixed', left: '0'}}>
            <Nav2 title={lawanChat?.nama_user}>
                <Link href={`/profil/${lawanChat?.id_user}`} />
            </Nav2>
        </div>

        <Bubble person={person} id_userMe={props.id_user} />
        <FormPesan person={person} token={props.token} id_chat={idCht} id_userMe={props.id_user} lawan={lawanChat} />
    </>)
}

export default memo(index)