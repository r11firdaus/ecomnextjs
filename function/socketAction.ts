import { getReq } from "./API";
import { loadMsg, loadNotif } from "./loadData";


export const socketMsg = async (data: any, page: string, id_user: string|number , token: string, id_chat: string): Promise<void> => {
    const localChat = localStorage.getItem('chats');
    let jsonLocalChat = localChat && JSON.parse(localChat);

    let dataNamaUser: any[]
    let dataIdNamaUser: any[]

    if (jsonLocalChat !== null || jsonLocalChat) {
        jsonLocalChat.map(jlc => {
            if (!dataIdNamaUser.includes(jlc.id_user)) {
                jlc.nama_user && dataNamaUser.push({ nama: jlc.nama_user, id: jlc.id_user })
                dataIdNamaUser.push(jlc.id_user)
            }
        })
    }

    if (!data.nama_user) {
        for (let i = 0; i < dataNamaUser.length; i++) {
            if (data.id_user == dataNamaUser[i].id) {
                data.nama_user = dataNamaUser[i].nama
                break;
            }
        }
        // kalau masih gak ada
        if (!data.nama_user) {
            await getReq('user', data.id_user, token).then((res: any) => {
                data.nama_user = res.nama_user
            })
        }
    }

    switch (page) {
        case 'pesan':
            if (jsonLocalChat) {
                let newLocalChat = [data, ...jsonLocalChat];
                localStorage.setItem('chats', JSON.stringify(newLocalChat))
            }
            else await loadMsg(id_user, token)
            break;
        case 'chats':
            if (jsonLocalChat) {
                let copyJson: any[];
                jsonLocalChat.map((jsc: any) => {
                    if (jsc.id_chat == id_chat && jsc.receiver_user == id_user) {
                        jsc.status_message = 'read'
                    }
                    copyJson.push(jsc)
                })
                let newLocalChat = [data, ...copyJson];
                localStorage.setItem('chats', JSON.stringify(newLocalChat))
            }
            else await loadMsg(id_user, token)
            break;

        default: null
            break;
    }
}