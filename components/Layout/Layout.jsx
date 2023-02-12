import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React from 'react'
// import Footer from './Footer'
import FristNav from './FristNav'
// import Navbar from './MainNavbar'
const Navbar = dynamic(
  () => import('./MainNavbar'),
  { ssr: false }
)
const Footer = dynamic(
  () => import('./Footer'),
  { ssr: false }
)
function Layout({children}) {
  const router = useRouter()
  return (
    <>
        <div className={router.asPath === '/' ? `navbar` : `navbar light_nav`}>
          <div className="container">
            <FristNav/>
            <Navbar/>
          </div>
        </div>
        <main> {children} </main>
        <footer>
          {/* <Footer/> */}
        </footer>
    </>
  )
}

export default Layout