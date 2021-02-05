import Router from "next/router"
import { ArrowLeft } from "react-bootstrap-icons"
import BottomNav from '../../components/bottomNav'

const index = () => {
    return (<>
        <div style={{ height: '3rem', display: 'flex', position: 'fixed', background: 'white', width: '100%', borderBottom: '1px solid grey' }}>
            <ArrowLeft size={20} style={{ marginTop: '13px', marginLeft: '10px', cursor: 'pointer' }} onClick={() => Router.back()} />
            <strong style={{ marginTop: '11px', marginLeft: '10px' }}>Notification</strong>
        </div>
        <BottomNav hal="notifikasi" />
    </>)
}

export default index