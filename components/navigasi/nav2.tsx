import { memo } from "react"
import Router from "next/router"
import { StylesDictionary } from "../../type"

interface Props { title: string }

const Nav2 = (props: React.PropsWithChildren<Props>): JSX.Element => {
    return (<>
        <div className="nav2">
            <span className="back-arrow" onClick={() => Router.back()}>&larr;</span>
            <strong style={style.title}>{props.title}</strong>
        </div>
    </>)
}

export default memo(Nav2)

const style: StylesDictionary = {
    title: {
        marginTop: '11px',
        marginLeft: '10px',
        color: 'white'
    }
}