import Router from "next/router";
import { memo, useEffect, useState } from "react"
import { getReq } from "../function/API";

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

    const updateHandler = (e, id) => {
        e.preventDefault()
        Router.push(`/barang/update/${id}`)
    }

    return (<>
    {console.log(data)}
        <div className="row" style={{display: 'flex', padding: '0'}}>
            {
                data.map(data => {
                    return (
                        <div className="card float-left" style={{margin: '0', width: '50%', padding: '8px'}} key={data.id_barang}>
                            <p><strong>{data.nama_barang}</strong></p>
                            <p>{data.harga_barang}</p>
                            {
                                props.id_userMe != data.id_seller ?
                                <div className="card-action" >
                                    <button className="button-small button-primary" style={{fontSize: '10px', padding: '0', margin: '3px auto', width: '100%'}}>Add to Cart</button>
                                    <button className="button-small button-outline" style={{fontSize: '10px', padding: '0', margin: '3px auto', width: '100%'}}>Add to Favorite</button>
                                </div> :
                                <div className="card-action" >
                                    <button
                                        className="button-small button-primary"
                                        style={{fontSize: '10px', padding: '0', margin: '3px auto', width: '100%'}}
                                        onClick={e => updateHandler(e, data.id_barang)}
                                    >Update</button>
                                    <button className="button-small button-outline" style={{fontSize: '10px', padding: '0', margin: '3px auto', width: '100%'}}>Delete</button>
                                </div>
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