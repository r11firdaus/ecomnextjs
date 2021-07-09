import Link from "next/link";
import { memo } from "react";
import { HouseFill } from "react-bootstrap-icons";
import { RootStateOrAny, useSelector } from "react-redux";
import { GlobalState } from "../../../type";

const index = (): JSX.Element => {
    const { page }: GlobalState = useSelector((state: RootStateOrAny) => state)
    return(<>
        {page == 'home' ?
            <HouseFill color="#4b3832" /> :
            <Link href="/"><HouseFill color="#be9b7b" /></Link>
        }
    </>)
} 

export default memo(index)