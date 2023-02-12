import { Phone } from '@mui/icons-material'
import React from 'react'
import {CiFacebook,CiTwitter,CiInstagram} from 'react-icons/ci'
import {AiOutlinePhone,AiOutlineMail} from 'react-icons/ai'
function FristNav() {
  return (
    <div className='contactInfoNav'>
        <div className="left">
            <div className="item"> 
                <div className="icon">
                    <AiOutlinePhone/>
                </div>
                <div className="text"> +201150360046 </div>
            </div>
            <div className="item">
                <div className="icon">
                    <AiOutlineMail/>
                </div>
                <div className="text"> mozwebsites@g.com </div>
            </div>
        </div>
        <div className="right">
            <div className="icon">
                <CiFacebook/>
            </div>
            <div className="icon">
                <CiInstagram/>
            </div>
            <div className="icon">
                <CiTwitter/>
            </div>
        </div>
    </div>
  )
}

export default FristNav