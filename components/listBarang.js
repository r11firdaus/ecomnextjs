import Link from "next/link";
import { memo, useEffect, useState } from "react"
import { getReq } from "../function/API";
// import OptionBtnBarang from "./optionBtnBarang";

const ListBarang = props => {
    const [data, setdata] = useState([])
    useEffect(async () => {
        if (props.id_user) {
            const { res } = await getReq('barang/user', props.id_user, props.token)
            setdata(res)
        }
        else if (props.nama_subcategory) {
            const { res } = await getReq('barang/subcategory', props.nama_subcategory, '')
            setdata(res)
        } else {
            const { res } = await getReq('barang', '', '')
            setdata(res)
        }
    }, [])

    return (<>
        <div className="row" style={{ display: 'flex', padding: '5px' }}>
            {
                data.map(data => {
                    return (
                        <Link href={`/barang/${data.id_barang}`} key={data.id_barang}>
                            <div
                                className="card float-left"
                                style={{ margin: '0', width: '50%', padding: '2px', cursor: 'pointer' }}
                            >
                                <div style={{ aspectRatio: '16/9', maxHeight: '500px', maxWidth: '500px', border: '1px solid grey', margin: 'auto' }}>
                                    Foto Produk
                                </div>

                                <div style={{margin: '10px'}}>
                                    <p style={{ margin: '0' }}>{data.nama_barang}</p>
                                    <strong>{data.harga_barang}</strong>
                                    <div style={{ display: 'flex' }}>
                                        <p style={{ margin: '0 5px 0 0', fontSize: '12px' }}>Sold: 200 | </p>
                                        <p style={{ margin: '0 5px 0 0', fontSize: '12px' }}>Ratings: 4.8/5</p>
                                    </div>
                                    <p style={{ margin: '0 5px 0 0', fontSize: '12px' }}>Cimahi</p>
                                    {/* {
                                        props.id_userMe == data.id_seller ?
                                        <OptionBtnBarang data={data} id_userMe={props.id_userMe} token={props.token} />:
                                        <OptionBtnBarang add data={data} id_userMe={props.id_userMe} token={props.token} />
                                    } */}
                                </div>
                            </div>
                        </Link>
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