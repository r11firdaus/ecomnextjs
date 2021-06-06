import { memo } from "react"
import Cookie from 'js-cookie';

const Saldo = props => {
    const idUser = Cookie.get('id_user');
    const token = Cookie.get('token');
    
    return (<>
        {idUser === props.id_userMe && token &&
            <div className="card" style={{ display: 'flex', padding: '0' }}>
                <button className="button-small button-primary-text" style={{ fontSize: '10px', padding: '0 5px', margin: '3px auto', flex: '2' }}>Saldo Rp. 1000000</button>
                <button className="button-small button-primary" style={{ fontSize: '10px', padding: '0 5px', margin: '3px auto', flex: '1' }}>% Voucher</button>
            </div>
        }
    </>)
}

export default memo(Saldo)