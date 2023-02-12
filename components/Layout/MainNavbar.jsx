import { logoutAction } from "../../redux/usersSlice"
// import { Menu } from "@mui/icons-material"
import Link from "next/link"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Logo from "./Logo"
import MobileNav from "./MobileNav"
// import {} from ''
function Navbar() {

  const dispatch = useDispatch()
  const [mobileSize,setMobileSize] = useState(false)
  const {userAuth} = useSelector(state => state.users)
  
  const logoutHandler = () => {
    dispatch(logoutAction())
  }
  return (
    <nav className='mainNav'>
      <MobileNav mobileSize={mobileSize}/> 
      {!mobileSize && (
        <div className="nav_full">
          <div className="links">
            <Link href="/" className="link">home</Link>
            <Link href="/blogs" className="link">blogs</Link>
          </div>
          <Logo/>
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
      )}
      <div className={mobileSize ? "burger_menu close" : "burger_menu"} onClick={() => setMobileSize(!mobileSize)}>
          <span></span>
          <span></span>
          <span></span>
      </div>
    </nav>
  )
}

export default Navbar