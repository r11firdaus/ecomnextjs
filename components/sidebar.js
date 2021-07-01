import Link from 'next/link';
import { useEffect, memo, useState } from 'react'

const dummy = [
    {page: 'Transaksi',url: 'transaksi'},
    {page: 'Notifikasi',url: 'notifikasi'},
    {page: 'Official Store',url: 'official'},
    {page: 'Kategori',url: 'kategori'},
    {page: 'Get Voucher',url: 'voucher'},
    {page: 'Event',url: 'event'},
    {page: 'Keranjang',url: 'keranjang'},
    {page: 'Favorit',url: 'favorit'},
    {page: 'Pesan',url: 'pesan'},
    {page: 'Jwallin Blog',url: 'blog'},
]

const Sidebar = () => {
    const [page, setpage] = useState('');

    useEffect(() => {
        const location = window.location.pathname;
        setpage(location)
    }, [])

    return (<>
        <aside className="sidebar sidebar-left">
            <h3 className="sidebar-category">Menu</h3>
            <ul className="sidebar-links">
                {
                    dummy.map((menu, i) => (
                        <li key={i} className={`/${menu.url}` == page && 'active'}>
                            <Link href={`/${menu.url}`}>{menu.page}</Link>
                        </li>
                    ))
                }
            </ul>
        </aside>
        <style jsx>
            {`
                aside {
                    overflow-y:scroll;
                    flex-grow: 1;
                    height: 500px;
                    border-bottom: 1px solid #e0e0e0;
                }
            `}
        </style>
    </>)
}

export default memo(Sidebar)