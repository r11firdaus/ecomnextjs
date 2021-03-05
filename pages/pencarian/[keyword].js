import Nav from '../../components/navigasi/nav'
import ListBarang from '../../components/listBarang'
import { memo, useEffect, useState } from 'react';
import { getReq } from '../../function/API';
import { useSelector } from 'react-redux';

export const getServerSideProps = async ctx => {
    const {keyword} = ctx.query;

    return {
        props: {keyword}
    }
}

const index = props => {
    const pisah = props.keyword.split("=")
    const judul = pisah[1].replace(/_/g, " ")
    const [data, setdata] = useState([])
    const {sort, cod} = useSelector(state => state)

    useEffect(async () => {
        const {res} = await getReq('search', props.keyword, '', sort)
        setdata(res)
    }, [props.keyword, sort, cod])

    return(<>
        <Nav />
        <div style ={{margin: '4rem 0'}}>
            <strong style={{marginLeft: '10px'}}>Result for '{judul}'</strong>
            <ListBarang data={data} />
        </div>
    </>)
}

export default memo(index)

// next
// perbaiki listBarang di page subcategory, api subcategory, dan api barang by id_user