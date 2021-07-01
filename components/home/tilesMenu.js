import { Building, GraphUp, List, Phone, ThreeDots } from "react-bootstrap-icons"
import Link from 'next/link'
import { memo } from "react"

const dummy = [
    {
        id: 1,
        icon: <List size={25} />,
        name: 'Category',
        url: '/kategori'
    },
    {
        id: 2,
        icon: <Phone size={25} />,
        name: 'Topup',
        url: '/'
    },
    {
        id: 3,
        icon: <GraphUp size={25} />,
        name: 'Invest',
        url: '/'
    },
    {
        id: 4,
        icon: <Building size={25} />,
        name: 'Travel',
        url: '/'
    },
    {
        id: 5,
        icon: <ThreeDots size={25} />,
        name: 'Other',
        url: '/'
    },
]

const TilesMenu = () => {
    return (<>
        <div className="row">
            {
                dummy.map(data => (
                    <Link href={data.url} key={data.id}>
                        <div className="col col-xs-3 col-sm-3 col-md-3 col-lg-2" id="tile">
                            <p className="align-center">{data.icon}</p>
                            <p className="align-center" style={{ marginTop: "-10px", fontSize: "12px" }}>{data.name}</p>
                        </div>
                    </Link>
                ))
            }
        </div>
        <style jsx>
            {`
                #tile {
                    margin: 5px 0,
                    cursor: pointer,
                    color: #854442
                }
            `}
        </style>
    </>)
}

export default memo(TilesMenu)