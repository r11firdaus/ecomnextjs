import { memo } from "react";
import { useSelector } from "react-redux"
import Nav2 from "./nav2";
import Nav from "./nav";
import BottomNav from "./bottomNav";

const index = () => {
    const { page } = useSelector(state => state);

    if (page === 'kategori') return <Nav2 />;
    if (page === 'cart') return <Nav2 />;
    if (page === 'pesan') return <><Nav2 /><BottomNav /></>;
    if (page === 'notifikasi') return <><Nav2 /><BottomNav /></>;
    if (page === 'subkategori') return <Nav />
    if (page === 'pencarian') return <Nav />
    if (page === 'home') return <><Nav /><BottomNav /></>
    if (page === 'profil') return <><Nav /><BottomNav /></>
    else return null;
}

export default memo(index)