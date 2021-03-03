import Link from "next/link";
import { memo, useEffect, useState } from "react"
import { getReq } from "../function/API";
import Image from 'next/image'

const ListBarang = props => {
    const [data, setdata] = useState([])
    const [sort, setsort] = useState('')
    const [cod, setcod] = useState(false)

    useEffect(async () => {
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
    }, [])

    const hargaHandler = async () => {
        sort === '' && setsort('lowest')
        sort === 'lowest' && setsort('highest')
        sort === 'highest' && setsort('')
        
        const { res } = await getReq('barang/subcategory', props.nama_subcategory, '', sort)
        setdata(res)
    }

    return (<>
    {console.log(sort)}
        <div className="row" style={{ display: 'flex', padding: '5px' }}>
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
                                                <p style={{ margin: '0 5px 0 0', fontSize: '12px' }}>Sold: {data.terjual_barang} | </p>
                                                <p style={{ margin: '0 5px 0 0', fontSize: '12px' }}>Ratings: {data.rating_barang}/5</p>
                                            </> :
                                            <p style={{ margin: '0 5px 0 0', fontSize: '12px' }}>Ratings: {data.rating_barang}/5</p>
                                        }
                                    </div>
                                    <p style={{ margin: '0 5px 0 0', fontSize: '12px' }}>Cimahi</p>
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