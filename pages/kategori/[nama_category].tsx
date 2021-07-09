import { memo } from 'react'
import ListCategory from '../../components/listCategory'
import Breadcumbs from '../../components/breadcumbs';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ctx => {
    const { nama_category } = ctx.query;

    return {
        props: { nama_category }
    }
}

const index = (props: {nama_category: string}): JSX.Element => {
    return (<>
        <div style={{ marginTop: '-1.5rem' }}>
            <Breadcumbs />
            <ListCategory nama_category={props.nama_category} />
        </div>
    </>)
}

export default memo(index)