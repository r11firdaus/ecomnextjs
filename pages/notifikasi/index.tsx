import { memo, useEffect, useState } from 'react'
import { getReq } from '../../function/API'
import cookie from 'js-cookie'
import Router from 'next/router'
import { useDispatch } from 'react-redux'

type Notif = {
    id_notification: number|string,
    judul_notification: string,
    isi_notification: string,
    waktu_notification: string
}

const index = (): JSX.Element => {
    const [notif, setnotif] = useState<Notif[]>([])
    const dispatch = useDispatch()

    const loadData = async (): Promise<void> => {
        const id_user = cookie.get('id_user')
        const token = cookie.get('token')

        if (id_user && token) {
            const localNotif = localStorage.getItem('notification');
            if (localNotif) setnotif(JSON.parse(localNotif))
            else {
                await getReq('notification', id_user, token).then((res: typeof notif) => {
                    localStorage.setItem('notification', JSON.stringify(res))
                    setnotif(res)
                })
            }
        }
        else Router.push('/')
    }

    useEffect(() => {
        dispatch({type: 'SITE_PAGE', payload: Router.pathname})
        loadData()
    }, [])

    const cardNotif = (): any => (<>
        {notif.length > 0 ?
            <>
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
            </> : <div className="dots-4" />
        }
    </>)


    return (<>
        {cardNotif()}
    </>)
}

export default memo(index)