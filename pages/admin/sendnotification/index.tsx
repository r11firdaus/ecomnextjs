import { GetServerSideProps } from 'next';
import { useState, Fragment, memo, useEffect } from 'react';
import { getReq, postReq } from '../../../function/API'
import { authPage } from '../../../middleware/authrizationPage';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { id_user, token } = await authPage(ctx);

    return {
        props: { id_user, token }
    }
}

type Props = { id_user: number, token: string }
type NotifSelected = {id_notification: number, isi_notification: string}

const index = (props: Props) => {
    const [idSelected, setidSelected] = useState([]);
    const [listIDUser, setlistIDUser] = useState([]);
    const [listNotif, setlistNotif] = useState([]);
    const [notifSelected, setnotifSelected] = useState<NotifSelected|undefined>(undefined)

    const loadData = async () => {
        let idOnly = [];
        await getReq('user', '', props.token, '').then((res: any) => {
            res.map((data: any) => idOnly.push(data.id_user))
        })
        setlistIDUser(idOnly)
        
        await getReq('notification', '', props.token, '').then((res: any) => {
            setlistNotif(res)
        })
    }

    useEffect(() => {
        loadData()
    }, [])

    const selectID = () => {
        const optionID = (document.getElementById('id_user') as HTMLSelectElement);
        const valID = optionID.options[optionID.selectedIndex].value;
        let idSel = [...idSelected];
        idSel.push(valID);
        setidSelected(idSel);
        let newIdFiltered = [];
        listIDUser.map(id => id != valID && newIdFiltered.push(id));
        setlistIDUser(newIdFiltered);
    }

    const selectNotifID = () => {
        const optionID = (document.getElementById('id_notification') as HTMLSelectElement);
        const valID = optionID.options[optionID.selectedIndex].value;

        let isiNotif: any;
        for (let i = 0; i < listNotif.length; i++) {
            if (listNotif[i].id_notification == valID) {
                isiNotif = listNotif[i]
                break;
            }
        }
        setnotifSelected(isiNotif)      
    }

    const sendNotification = async () => {
        await postReq('notification/send', props.token, {
            id_user: idSelected,
            id_notification: notifSelected.id_notification
        }).then((res: any) => alert(res.data));
    }

    return (
        <div style={{ padding: '40px 10px' }}>
            <h5>Send Notification</h5>
            <p>Title</p>
            <select id="id_notification" onChange={() => selectNotifID()} required={idSelected.length < 1 ? true : false}>
                <option value="" disabled>Choose ID Notification</option>
                {
                    listNotif.map((data, index) => (
                        <Fragment key={index}>
                            <option
                                value={data.id_notification}
                            > ID={data.id_notification} - "{data.judul_notification}"</option>
                        </Fragment>)
                    )
                }
            </select><br />
            <p>Contents</p>
            <textarea value={notifSelected?.isi_notification} id="content" placeholder="Nama Barang" disabled /><br />
            <p>User</p>
            <select id="id_user" required={idSelected.length < 1 ? true : false} style={{ width: '75%', float: 'left' }}>
                <option value="" disabled>Choose ID User</option>
                {
                    listIDUser.map((sub, index) => (
                        <Fragment key={index}>
                            <option
                                value={sub}
                            > ID={sub}</option>
                        </Fragment>)
                    )
                }
            </select>
            <button onClick={() => selectID()} style={{ width: '20%', float: 'right'}}>+</button>
            <button style={{ marginTop: '30px'}} onClick={()=>sendNotification()}>Send</button>
        </div>
    )
}

export default memo(index)