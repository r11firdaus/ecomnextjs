import { memo } from "react"

const index = (props: {value: number}): JSX.Element => (
    <div className="baloon-new">
        <p className="txt-baloon">{props.value}</p>
    </div>
)

export default memo(index)