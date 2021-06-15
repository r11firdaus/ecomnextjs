import Link from "next/link";
import { memo } from "react"
import Image from 'next/image'
import FilterHandler from "./pencarian/filterHandler";

const ListBarang = props => {
    return (<>
        <div className="row">
            <FilterHandler />
            {
                props.data.map(data => {
                    return (
                        <div className="card col col-sm-6">
                            <Link href={`/barang/${data.id_barang}`} key={data.id_barang}>
                                <>
                                <div className="align-center">
                                    <Image
                                        height='100%'
                                        width='100%'
                                        alt={`gambar ${data.nama_barang}`}
                                        // src={data.gambar_barang}
                                        src="https://chelseakrost.com/wp-content/uploads/2018/06/Super_Angry_Face_Emoji_ios10_large.png"
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
                                </>
                            </Link>
                        </div>
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