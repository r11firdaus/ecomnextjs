import { memo, useEffect, useState } from "react"
import Link from 'next/link'

const Breadcumbs = (): JSX.Element => {
    const [loc, setloc] = useState([])

    useEffect(() => {
        const location = window.location.pathname;
        let pisahLocation = location.split('/')
        pisahLocation.shift()
        setloc(pisahLocation)
    }, [])

    return (
        <ul className="breadcrumbs" style={{margin: '10px'}}>
            <li><Link href='/'>Home</Link></li>
            {
                loc.map((page, i) => (
                    i + 1 !== loc.length ?
                        <li key={i}><Link href={`/${page}`}>{page}</Link></li> :
                        <li key={i}>{page}</li>
                ))
            }
        </ul>
    )
}

export default memo(Breadcumbs)