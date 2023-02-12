import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import Logo from './Logo'

function MobileNav({mobileSize}) {
    const {userAuth} = useSelector(state => state.users)
    const logoutHandler = () => {
        dispatch(logoutAction())
    }
  return (
    <div className= {mobileSize ? 'mobile_nav active' : 'mobile_nav hide'}>
        <Logo/>
        <div className="links">
            <Link href="/" className="link">home</Link>
            <Link href="/posts" className="link">blogs</Link>
        </div>
        <div className="links">
            {userAuth?.token ? (
            <>
                <Link href="/" className="link" onClick={logoutHandler}>log out</Link>
            </>
            ) : (
            <>
                <Link href="/login" className="link">login</Link>
                <Link href="/register" className="link">register</Link>
            </>
            )}
        </div>
    </div>
  )
}

export default MobileNav