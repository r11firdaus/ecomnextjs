import cookies from 'next-cookies'
import { getReq } from '../../function/API';
import Nav from '../../components/navigasi/nav'
import OptionBtnBarang from '../../components/optionBtnBarang'
import Head from 'next/head'
import { ChatDots } from 'react-bootstrap-icons';
import Link from 'next/link';

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
    return (<>
        <Head>
            <title>{`${props.data.nama_barang} | Jwallin`}</title>
         </Head>
        <Nav />

        <div style={{margin: '4rem 0'}}>
            <div style={{aspectRatio: '16/9', maxHeight: '500px', maxWidth: '500px', border: '1px solid grey', margin: 'auto'}}>for image preview</div>

            <div style={{margin: '10px'}}>
                <strong>Rp.{props.data.harga_barang}</strong>
                <p style={{margin: '0'}}>{props.data.nama_barang}</p>
                <p style={{margin: '0', fontSize: '14px'}}>Stok: {props.data.stok_barang}</p>
                <div style={{display: 'flex'}}>
                    <p style={{margin: '0 5px 0 0', fontSize: '12px'}}>Sold: 200 | </p>
                    <p style={{margin: '0 5px 0 0', fontSize: '12px'}}>Ratings: 4.8/5</p>
                </div>
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

export default index