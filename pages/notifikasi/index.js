import { memo, useEffect, useState } from 'react'
import BottomNav from '../../components/navigasi/bottomNav'
import Nav2 from '../../components/navigasi/nav2'
import { getReq } from '../../function/API'
import cookie from 'js-cookie'
const index = () => {
    const [notif, setnotif] = useState([])

    useEffect(async() => {
        const id_user = cookie.get('id_user')
        const token = cookie.get('token')

        if (id_user && token) {
            const { res } = await getReq('notification', id_user, token)
            setnotif(res)
        }
    }, [])

    const cardNotif = () => (<>
        {notif.length > 0 &&
            <div style={{margin: '3.4rem 0'}}>
                {notif.map(noti => {
                    // noti.judul_notification dibuat max 20 char
                    // noti.isi_notification dibuat max 100 char
                    return (<>
                        <div className="card" key={noti.id_notifrecord} style={{padding: '10px'}}>
                            <h6>{noti.judul_notification}</h6>
                            <p>{noti.isi_notification}</p>
                            <p>{noti.waktu_notification}</p>
                        </div>
                    </>)
                })}
            </div>
        }
    </>)


    return (<>
        <Nav2 title="Notification" />
        {cardNotif()}
        <BottomNav hal="notifikasi" />
    </>)
}

export default memo(index)