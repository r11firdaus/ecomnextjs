import { memo } from "react"

const Skelpesan = (): JSX.Element => {
    return (
        <li>
            <div className="skel-pesan-name" />
            <div className="skel-pesan-message" />
        </li>
    )
}

export default memo(Skelpesan)
