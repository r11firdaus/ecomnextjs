import { memo, useEffect, useState } from "react"

const ListBarang = props => {
    const [data, setdata] = useState([])
    useEffect(async() => {
        let req;
        if (props.id_user) {
            req = await fetch(`http://localhost:3000/api/barang/user/${props.id_user}`, {
                headers: {
                    'Authorization': `no no apirezajwallin`
                }
            })            
        }
        else if (props.nama_subcategory) {
            req = await fetch(`http://localhost:3000/api/barang/subcategory/${props.nama_subcategory}`, {
                headers: {
                    'Authorization': `no no apirezajwallin`
                }
            })  
        } else {
            req = await fetch(`http://localhost:3000/api/barang/`, {
                headers: {
                    'Authorization': `no no apirezajwallin`
                }
            })
        }

        const res = await req.json()
        setdata(res.data)
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
                                props.id_userMe != data.id_user ?
                                <div className="card-action" >
                                    <button className="button-small button-primary" style={{fontSize: '10px', padding: '0', margin: '3px auto', width: '100%'}}>Add to Cart</button>
                                    <button className="button-small button-outline" style={{fontSize: '10px', padding: '0', margin: '3px auto', width: '100%'}}>Add to Favorite</button>
                                </div> :
                                <div className="card-action" >
                                    <button className="button-small button-primary" style={{fontSize: '10px', padding: '0', margin: '3px auto', width: '100%'}}>Update</button>
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