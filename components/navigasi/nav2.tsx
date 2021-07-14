import { memo } from "react"
import Router from "next/router"
import { ArrowLeft } from "react-bootstrap-icons"
import { StylesDictionary } from "../../type"

interface Props { title: string }

const Nav2 = (props: React.PropsWithChildren<Props>): JSX.Element => {
    return (<>
        <div style={style.wrapper}>
            <ArrowLeft size={20} color="white" style={style.arrow} onClick={() => Router.back()} />
            <strong style={style.title}>{props.title}</strong>
        </div>
    </>)
}

export default memo(Nav2)

const style: StylesDictionary = {
    wrapper: {
        height: '3rem',
        display: 'flex',
        position: 'fixed',
        background:'#3c2f2f',
        width: '100%',
        borderBottom: '1px solid grey'
    },
    arrow: {
        marginTop: '13px',
        marginLeft: '10px',
        cursor: 'pointer'
    },
    title: {
        marginTop: '11px',
        marginLeft: '10px',
        color: 'white'
    }
}