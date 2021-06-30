import cookies from 'next-cookies'
import { getReq } from '../../function/API';
import OptionBtnBarang from '../../components/optionBtnBarang'
import Head from 'next/head'
import { ChatDots } from 'react-bootstrap-icons';
import Link from 'next/link';
import Image from 'next/image'
import { useEffect, memo } from 'react';
import { useDispatch } from 'react-redux';

export const getServerSideProps = async ctx => {
    const {id_barang} = ctx.query;
    let id_userMe = null
    let token = null
    let data = null
    const cookie = cookies(ctx)

    if (cookie.id_user && cookie.token) {
        id_userMe = cookie.id_user
        token = cookie.token
    }

    if (id_barang) {
        const {res} = await getReq('barang', id_barang, '')
        data = res
    }

    return {
        props: {
            id_userMe,
            token,
            data
        }
    }
}

const index = (props) => {
    const dispatch = useDispatch();
    useEffect(() => dispatch({type: 'SITE_PAGE', payload: 'barang'}), []);

    return (<>
        <Head>
            <title>{`${props.data.nama_barang} | Jwallin`}</title>
            <meta name="Keywords" content={`${props.data.nama_barang}, ${props.data.deskripsi_barang}`} />
            <meta name="description" content="Cari barang termurah dan terpercaya hanya di Jwallin" />
         </Head>

        <div style={{margin: '4.3rem 0 4rem 0'}}>
            <div className="align-center" style={style.image}>
                <Image
                    height={'275'}
                    width={'300'}
                    // layout="responsive"
                    alt={`gambar ${props.data.nama_barang}`}
                    className="img-thumb"
                    src="https://chelseakrost.com/wp-content/uploads/2018/06/Super_Angry_Face_Emoji_ios10_large.png"
                />
            </div>
            <div style={{margin: '10px'}}>
                <p style={{margin: '0'}}>{props.data.nama_barang}</p>
                <strong>Rp.{props.data.harga_barang}</strong>
                <p style={{margin: '0', fontSize: '14px'}}>Stok: {props.data.stok_barang}</p>
                <div style={{display: 'flex'}}>
                    <p style={{margin: '0 5px 0 0', fontSize: '12px'}}>Sold: 200 | </p>
                    <p style={{margin: '0 5px 0 0', fontSize: '12px'}}>Ratings: 4.8/5</p>
                </div>
            </div>
            <div style={{margin: '10px'}}>
                <strong>Deskripsi</strong>
                <p>{props.data.deskripsi_barang}</p>
            </div>
        </div>
        
        <div style={{bottom: '0', position: 'fixed', width: '100%', padding: '10px 5px', borderTop: '1px  rgba(224,224,224,1) solid', background: 'white'}}>
            {
                props.id_userMe != props.data.id_seller &&
                <div className="float-left" style={{border: '1px solid grey', padding: '0', borderRadius: '5px'}}>
                    <Link href={`/pesan/${props.id_userMe}$${props.data.id_seller}`}><ChatDots size={20} style={{margin: '6px 10px 0 10px'}} /></Link>
                </div>
            }

            <div className="float-right">
                {
                    props.id_userMe == props.data.id_seller ?
                    <OptionBtnBarang detail data={props.data} id_userMe={props.id_userMe} token={props.token} />:
                    <OptionBtnBarang detail add data={props.data} id_userMe={props.id_userMe} token={props.token} />            
                }
            </div>
        </div>
    </>)
}

export default memo(index)

const style = {
    image: {
        border: '1px solid',
        maxHeight: '500px',
        maxWidth: '700px',
        margin: '0 auto'
    }
}