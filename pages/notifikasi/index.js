import { memo, useEffect, useState } from 'react'
import { getReq } from '../../function/API'
import cookie from 'js-cookie'
import { useDispatch } from 'react-redux'

const index = () => {
    const [notif, setnotif] = useState([])
    const dispatch = useDispatch();

    useEffect(async () => {
        dispatch({ type: 'SITE_PAGE', payload: 'notifikasi' })
        const id_user = cookie.get('id_user')
        const token = cookie.get('token')

        if (id_user && token) {
            const localNotif = localStorage.getItem('notification');
            if (localNotif) setnotif(JSON.parse(localNotif))
            else {
                const { res } = await getReq('notification', id_user, token)
                localStorage.setItem('notification', JSON.stringify(res))
                setnotif(res)
            }
        }
    }, [])

    const cardNotif = () => (<>
        {notif.length > 0 &&
            <div style={{ margin: '3.4rem 0' }}>
                {notif.map((noti, i) => {
                    // noti.judul_notification dibuat mationx 20 char
                    // noti.isi_notification dibuat max 100 char
                    return (<>
                        <div className="card" key={i} style={{ padding: '10px' }}>
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
        {cardNotif()}
    </>)
}

export default memo(index)