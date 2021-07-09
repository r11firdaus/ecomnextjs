import Link from "next/link"
import { memo } from "react"
import { BoxArrowInLeft, PersonFill } from "react-bootstrap-icons"
import { useSelector } from "react-redux"
import { GlobalState } from "../../../type"

const index = (): JSX.Element => {
    const {page, id_user}: GlobalState = useSelector(state => state)
    
    return(<>
        {
            id_user !== null ?
                page == 'profil' ?
                    <PersonFill size={20} color="#4b3832" /> :
                    <Link href={`/profil/${id_user}`}><PersonFill size={20} color="#be9b7b" /></Link> :
                <Link href="/login"><BoxArrowInLeft color="#be9b7b" /></Link>
    
        }
    </>)
}

export default memo(index)