import { memo } from "react"
import Cookie from 'js-cookie';
import { MyIdAndToken } from "../../type";

const Saldo = (props: MyIdAndToken): JSX.Element => {
    const idUser = Cookie.get('id_user');
    const token = Cookie.get('token');
    
    return (<>
        {idUser == props.id_user && token &&
            <div className="card row">
                <button className="col col-xs-8 button-small button-primary-text" style={style.btn}>Saldo Rp. 1000000</button>
                <button className="col col-xs-4 button-small button-primary" style={style.btn}>% Voucher</button>
            </div>
        }
    </>)
}

export default memo(Saldo)

const style = {
    btn: {
        fontSize: '10px',
        padding: '0 5px',
        margin: "0"
    }
}