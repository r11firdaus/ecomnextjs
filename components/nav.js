import Link from 'next/link'
import Cookie from 'js-cookie'
import Router from 'next/router'

export default function Nav() {
    const logoutHandler = e => {
        // e.preventDefalut();
        Cookie.remove("token");
        Router.replace('/login')
    }
    return (
        <>
          <Link href="/posts">Posts</Link>
          &nbsp; | &nbsp;
          <Link href="/posts/create">Create Posts</Link>
          &nbsp; | &nbsp;
          <a href="#" onClick={logoutHandler}>Logout</a>
        </>
    )
}
