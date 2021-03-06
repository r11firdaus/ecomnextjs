import { memo } from "react";
import { postReq } from "../../function/API";
import { socket } from '../../function/socket'
import { MyIdAndToken } from "../../type";

interface Props extends MyIdAndToken{
    person: any[],
    id_chat: string,
    id_userMe: string|number,
    lawan: { id_user: string|number },
}

const FormPesan = (props: Props): JSX.Element => {
    const sendHandler = async (e: any): Promise<void> => {
        e.preventDefault()
        const input = (document.getElementById('msg-input') as HTMLInputElement);
        if (props.person.length > 0) input.value?.length > 0 && postMsg(input.value);
        else {
            // buat id_chat baru lalu kirim message
            if (input.value?.length > 0) {
                const pisahIdUser = props.id_chat.split('$')
                await postReq('chat/create', props.token, {
                    id_chat: props.id_chat,
                    id_user1: pisahIdUser[0],
                    id_user2: pisahIdUser[1]
                })
                postMsg(input.value);
            }
        }
        input.value = '';
    }

    const postMsg = async (input: string): Promise<void> => {
        const data = {
            id_chat: props.id_chat,
            id_user: props.id_userMe,
            receiver_user: props.lawan.id_user,
            message: input,
            status_message: 'unread'
        }
        await postReq('chat/message/create', props.token, data)
        const getMsg = localStorage.getItem('chats');
        const msgToJSON = getMsg && JSON.parse(getMsg);
        socket.emit('chat message', input, props.id_chat, props.lawan.id_user, props.id_userMe);
        // localStorage.setItem('chats', JSON.stringify([data, ...msgToJSON]))
    }

    return (<>
        <form id="form" className="col-lg-offset-3" onSubmit={e => sendHandler(e)}>
            <input id="msg-input" autoComplete="off" />
            <button>Send</button>
        </form>
        <style jsx>
            {`
            #form { background: white; padding: 0.25rem; position: fixed; bottom: 0; left: 0; right: 0; display: flex; height: 3rem; box-sizing: border-box; backdrop-filter: blur(10px); }
            #msg-input { border: 1px solid #4b3832; padding: 0 1rem; flex-grow: 1; border-radius: 2rem; margin: 0.25rem; }
            #msg-input { outline: none; }
            #form > button { background: #333; border: none; padding: 0 1rem; border-radius: 3px; outline: none; color: #fff; }
        `}
        </style>
    </>)
}

export default memo(FormPesan)