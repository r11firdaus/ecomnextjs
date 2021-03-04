import { List } from "react-bootstrap-icons"
import Link from 'next/link'
import { memo } from "react"

const dummy = [
    {
        id: 1,
        icon: <List size={25} />,
        name: 'Dummy',
        url: 'kategori'
    },
    {
        id: 2,
        icon: <List size={25} />,
        name: 'Dummy',
        url: 'kategori'
    },
    {
        id: 3,
        icon: <List size={25} />,
        name: 'Dummy',
        url: 'kategori'
    },
    {
        id: 4,
        icon: <List size={25} />,
        name: 'Dummy',
        url: 'kategori'
    },
    {
        id: 5,
        icon: <List size={25} />,
        name: 'Dummy',
        url: 'kategori'
    },
]

const TilesMenu = () => {
    return (
        <div className="row" style={{margin: '20px 0', display: 'flex'}}>
            {
                dummy.map(data => (
                    <Link href={`/${data.url}`} key={data.id}>
                        <div className="float-left" style={{minWidth: '25%', margin: '15px 0', cursor: 'pointer', color: '#854442'}}>
                            <p style={{margin: '0', textAlign: 'center'}}>{data.icon}</p>
                            <p style={{margin: '0', textAlign: 'center', fontSize: '12px'}}>{data.name}</p>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default memo(TilesMenu)