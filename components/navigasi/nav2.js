import { memo } from "react"
import Router from "next/router"
import { ArrowLeft } from "react-bootstrap-icons"

const Nav2 = props => {
    return (<>
        <div style={{ height: '3rem', display: 'flex', position: 'fixed', background: 'white', width: '100%', borderBottom: '1px solid grey' }}>
            <ArrowLeft size={20} style={{ marginTop: '13px', marginLeft: '10px', cursor: 'pointer' }} onClick={() => Router.back()} />
            <strong style={{ marginTop: '11px', marginLeft: '10px' }}>{props.title}</strong>
        </div>
    </>)
}

export default memo(Nav2)