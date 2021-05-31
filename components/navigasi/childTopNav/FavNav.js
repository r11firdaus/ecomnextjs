import Link from "next/link"
import { memo } from "react"
import { HeartFill } from "react-bootstrap-icons"

const index = () => {
    console.log('favNav dimuat')

    return (
        <Link href="/favorit"><HeartFill color='#be9b7b' /></Link>
    )
}

export default memo(index)