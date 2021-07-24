import { memo } from "react"
import Router from "next/router"

interface Props { title: string }

const Nav2 = (props: React.PropsWithChildren<Props>): JSX.Element => {
    return (<>
        <div className="nav2">
            <span className="back-arrow center-xy" onClick={() => Router.back()}>&#10094;</span>
            <strong className="nav2-title center-xy">{props.title}</strong>
        </div>
    </>)
}

export default memo(Nav2)