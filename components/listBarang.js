import { memo, useEffect, useState } from "react"
import { getReq } from "../function/API";
import OptionBtnBarang from "./optionBtnBarang";

const ListBarang = props => {
    const [data, setdata] = useState([])
    useEffect(async() => {
        let req;
        if (props.id_user) {
            const {res} = await getReq('barang/user', props.id_user, props.token)
            setdata(res)
        }
        else if (props.nama_subcategory) {
            const {res} = await getReq('barang/subcategory', props.nama_subcategory, '')
            setdata(res)
        } else {
            const {res} = await getReq('barang', '', '')
            setdata(res)
        }        
    }, [])

    return (<>
        <div className="row" style={{display: 'flex', padding: '0'}}>
            {
                data.map(data => {
                    return (
                        <div className="card float-left" style={{margin: '0', width: '50%', padding: '8px'}} key={data.id_barang}>
                            <p><strong>{data.nama_barang}</strong></p>
                            <p>{data.harga_barang}</p>
                            {
                                props.id_userMe == data.id_seller ?
                                <OptionBtnBarang data={data} id_userMe={props.id_userMe} token={props.token} />:
                                <OptionBtnBarang add data={data} id_userMe={props.id_userMe} token={props.token} />
                            }
                        </div>
                    )
                })
            }
        </div>
    </>)
}

export default memo(ListBarang)

// Keterangan
// props.is_user = meminta data barang sesuai id_user
// props.is_userMe = user yg login