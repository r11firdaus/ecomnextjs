import Link from "next/link";
import { memo } from "react";
import { HouseFill } from "react-bootstrap-icons";

const index = (props: {page: string}): JSX.Element => {
    return(<>
        {props.page == '/' ?
            <HouseFill color="#4b3832" /> :
            <Link href="/"><HouseFill color="#be9b7b" /></Link>
        }
    </>)
} 

export default memo(index)