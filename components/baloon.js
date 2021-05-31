import { memo } from "react"

const index = (props) => (
    <div className="baloon-new">
        <p className="txt-baloon">{props.value}</p>
    </div>
)

export default memo(index)