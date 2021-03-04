import Link from "next/link";
import { memo, useEffect, useState } from "react"
import { getReq } from "../function/API";
import Image from 'next/image'

const ListBarang = props => {
    const [data, setdata] = useState([])
    const [sort, setsort] = useState('')
    const [cod, setcod] = useState(false)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        if (props.id_userReq) {
            const { res } = await getReq('barang/user', props.id_userReq, props.token, sort)
            setdata(res)
        }
        else if (props.nama_subcategory) {
            const { res } = await getReq('barang/subcategory', props.nama_subcategory, '', sort)
            setdata(res)
        } else {
            const { res } = await getReq('barang', '', '')
            setdata(res)
        }
    }

    const hargaHandler = async () => {
        sort === 'highest' && setsort('')
        sort === 'lowest' && setsort('highest')
        sort === '' && setsort('lowest')
        
        getData()
    }

    const FilterHandler = () => (
            <div className="col" style={{display: 'flex', justifyContent: 'space-around'}}>
                <p
                    style={{borderBottom: sort !== '' && '1px solid green', margin: '5px', cursor: 'pointer'}}
                    onClick={() => hargaHandler()}
                >Harga {sort === 'highest' ? '+' : '-'}
                </p>
                <p
                    style={{borderBottom: cod && '1px solid green', margin: '5px', cursor: 'pointer'}}
                    onClick={() => setcod(!cod)}
                >COD
                </p>
            </div>
    )

    return (<>
        <div className="row" style={{ display: 'flex', padding: '5px' }}>
            <FilterHandler />
            {
                data.map(data => {
                    return (
                        <Link href={`/barang/${data.id_barang}`} key={data.id_barang}>
                            <div
                                className="card float-left"
                                style={{ margin: '0', width: '50%', padding: '2px', cursor: 'pointer'}}
                            >
                                <div style={{width: '100px', margin: '0 auto'}}>
                                    <Image
                                        height={'100%'}
                                        width={'100%'}
                                        alt={`gambar ${data.nama_barang}`}
                                        // src={data.gambar_barang}
                                        src="/../public/vercel.svg"
                                    />
                                </div>

                                <div style={{ margin: '10px' }}>
                                    <p style={{ margin: '0' }}>{data.nama_barang}</p>
                                    <strong>{data.harga_barang}</strong>
                                    <div style={{ display: 'flex' }}>
                                        {data.terjual_barang > 0 ?
                                            <>
                                                <p className="detail-mini">Sold: {data.terjual_barang} | </p>
                                                <p className="detail-mini">Ratings: {data.rating_barang}/5</p>
                                            </> :
                                            <p className="detail-mini">Ratings: {data.rating_barang}/5</p>
                                        }
                                    </div>
                                    <p className="detail-mini">{data.nama_user} | {data.kota_user}</p>
                                </div>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
        <style jsx>{`
        .detail-mini {margin: 0 5px 0 0; font-size: 12px;}
        `}</style>
    </>)
}

export default memo(ListBarang)