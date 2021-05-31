import Link from "next/link";
import { memo } from "react";
import { BellFill } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import Baloon from '../../baloon';

const index = () => {
    const { notification, page } = useSelector(state => state)
   
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