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
    const { id_barang } = ctx.query;
    let id_userMe = null
    let token = null
    let data = null
    const cookie = cookies(ctx)

    if (cookie.id_user && cookie.token) {
        id_userMe = cookie.id_user
        token = cookie.token
    }

    if (id_barang) {
        const { res } = await getReq('barang', id_barang, '')
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
    useEffect(() => {
        dispatch({ type: 'SITE_PAGE', payload: 'barang' });
        const getLastView = localStorage.getItem('last_view');
        let jsonLastView = getLastView ? JSON.parse(getLastView) : [];

        if (props.id_userMe != props.data.id_seller) {
            if (getLastView) {
                if (jsonLastView.length < 4) {
                    for (let i = 0; i < jsonLastView.length; i++) {
                        if (jsonLastView[i].id_barang == props.data.id_barang) {
                            jsonLastView.splice(i, 1)
                            break;
                        }
                    }
                } else jsonLastView.pop()
                jsonLastView.unshift(props.data)
            } else jsonLastView.push(props.data)
            localStorage.setItem('last_view', JSON.stringify(jsonLastView))
        }
    }, []);

    return (<>
        <Head>
            <title>{`${props.data.nama_barang} | Jwallin`}</title>
            <meta name="Keywords" content={`${props.data.nama_barang}, ${props.data.deskripsi_barang}`} />
            <meta name="description" content="Cari barang termurah dan terpercaya hanya di Jwallin" />
        </Head>

        <div>
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
            <div style={{ margin: '10px' }}>
                <p style={{ margin: '0' }}>{props.data.nama_barang}</p>
                <strong>Rp.{props.data.harga_barang}</strong>
                <p style={{ margin: '0', fontSize: '14px' }}>Stok: {props.data.stok_barang}</p>
                <div style={{ display: 'flex' }}>
                    <p style={style.detail}>Sold: 200 | </p>
                    <p style={style.detail}>Ratings: 4.8/5</p>
                </div>
            </div>
            <div style={{ margin: '10px' }}>
                <strong>Deskripsi</strong>
                <p>{props.data.deskripsi_barang}</p>
            </div>
        </div>

        <div className="col col-lg-offset-3" style={style.bottom}>
            <div className="row" style={{margin: '0'}}>
                <div className="col col-md-5 col-xs-3">
                    {props.id_userMe != props.data.id_seller &&
                        <div style={style.chatBtn}>
                            <Link href={`/pesan/${props.id_userMe}$${props.data.id_seller}`}><ChatDots size={20} style={{ margin: '6px 10px 0 10px' }} /></Link>
                        </div>
                    }
                </div>

                <div className="col col-md-7 col-xs-9">
                    {props.id_userMe == props.data.id_seller ?
                        <OptionBtnBarang detail data={props.data} id_userMe={props.id_userMe} token={props.token} /> :
                        <OptionBtnBarang detail add data={props.data} id_userMe={props.id_userMe} token={props.token} />
                    }
                </div>
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
    },
    bottom: {
        bottom: '0',
        left: '0',
        right: '0',
        position: 'fixed',
        borderTop: '1px  rgba(224,224,224,1) solid',
        background: 'white'
    },
    chatBtn: {
        border: '1px solid grey',
        padding: '0',
        borderRadius: '5px',
        width: '40px'
    },
    detail: {
        margin: '0 5px 0 0',
        fontSize: '12px' 
    }
}