import Link from "next/link";
import { memo } from "react";
import { HouseFill } from "react-bootstrap-icons";
import { useSelector } from "react-redux";

const index = () => {
    const {page} = useSelector(state => state)
    return(<>
        {page == 'home' ?
            <HouseFill color="#4b3832" /> :
            <Link href="/"><HouseFill color="#be9b7b" /></Link>
        }
    </>)
} 

export default memo(index)