import {memo} from 'react'

const dummy = [
    'Quick Menu',
    'Quick Menu',
    'Quick Menu',
    'Quick Menu',
    'Quick Menu',
    'Quick Menu',
    'Quick Menu',
    'Quick Menu',
    'Quick Menu',
    'Quick Menu',
    'Quick Menu',
    'Quick Menu',
]

const Sidebar = () => {
    return (<>
        <aside className="sidebar sidebar-left">
            <h3 className="sidebar-category">Quick Menu</h3>
            <ul className="sidebar-links">
                <li><a className="active" href="#">Cards</a></li>
                {
                    dummy.map((menu, i) => (
                        <li key={i}><a href="#">{menu}</a></li>
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