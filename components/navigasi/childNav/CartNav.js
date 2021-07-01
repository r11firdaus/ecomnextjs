import Link from "next/link"
import { memo } from "react"
import { CartFill } from "react-bootstrap-icons"
import { useSelector } from "react-redux"
import Baloon from "../../baloon"

const index = () => {
    const { cart } = useSelector(state => state)

    return (
        <Link href="/keranjang"><div style={{ display: 'flex' }}>
            <CartFill color='#be9b7b' />
            {cart > 0 && <Baloon value={cart} />}
        </div></Link>
    )
}

export default memo(index)