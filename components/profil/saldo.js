import { memo, useEffect, useState } from "react"

const Saldo = props => {
    const [data, setdata] = useState({})

    useEffect(() => {
        props.id_user && props.token &&
            fetch(`http://localhost:3000/api/user/${props.id_user}`, {
                headers: {
                    'Authorization': `Bearer ${props.token} apirezajwallin`
                }
            }).then(res => res.json()).then(json => setdata(json.data))

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