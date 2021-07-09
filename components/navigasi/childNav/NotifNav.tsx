import Link from "next/link";
import { memo } from "react";
import { BellFill } from "react-bootstrap-icons";
import { RootStateOrAny, useSelector } from "react-redux";
import { GlobalState } from "../../../type";
import Baloon from '../../baloon';

const index = (): JSX.Element => {
    const { notification, page }: GlobalState = useSelector((state: RootStateOrAny) => state)
   
    return(<>
        {page == 'notifikasi' ?
            <BellFill color="#4b3832" /> :
            <Link href="/notifikasi">
                <div style={{ display: 'flex' }}>
                    <BellFill color="#be9b7b" />
                    {notification > 0 && <Baloon value={notification} />}
                </div>
            </Link>
        }
    </>)
}

export default memo(index)