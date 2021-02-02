import { memo, useEffect, useState } from "react"
import { getReq } from "../../function/API"

const Saldo = props => {
    const [data, setdata] = useState({})

    useEffect(async() => {
        if (props.id_user && props.token) {
            const {res} = await getReq('user', props.id_user, props.token)
            setdata(res)
        }

    }, [])
    return (<>
        {data.id_user &&
            <div className="card" style={{ display: 'flex', padding: '0' }}>
                <button className="button-small button-primary-text" style={{ fontSize: '10px', padding: '0 5px', margin: '3px auto', flex: '2' }}>Saldo Rp. {data.saldo}</button>
                <button className="button-small button-primary" style={{ fontSize: '10px', padding: '0 5px', margin: '3px auto', flex: '1' }}>% Voucher</button>
            </div>
        }
    </>)
}

export default memo(Saldo)