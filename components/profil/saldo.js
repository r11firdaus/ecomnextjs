import { memo } from "react"
import Cookie from 'js-cookie';

const Saldo = props => {
    const idUser = Cookie.get('id_user');
    const token = Cookie.get('token');
    
    return (<>
        {idUser === props.id_userMe && token &&
            <div className="card row">
                <button className="col col-sm-8 button-small button-primary-text" style={style.button}>Saldo Rp. 1000000</button>
                <button className="col col-sm-4 button-small button-primary" style={style.button}>% Voucher</button>
            </div>
        }
    </>)
}

export default memo(Saldo)

const style = {
    button: {
        fontSize: '10px',
        padding: '0 5px',
        margin: "0"
    }
}