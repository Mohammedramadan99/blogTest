import React, { useState } from 'react'

import { Swiper, SwiperSlide } from "swiper/react";
import img_4 from '../../../public/images/landingPage.png'

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {EffectFade, Navigation, Pagination} from "swiper";
import {landingPage} from '../../../utils/data'
import Image from 'next/image';

function LandingPage() {
    const [data,setData] = useState(landingPage)
    // console.log(data)
  return (
  <div className="landingPage">
    {data && <Swiper
          slidesPerView={1}
          spaceBetween={30}
          effect={'fade'}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          loop={true}
          modules={[EffectFade, Navigation,Pagination]}
          className="mySwiper"
        >
            {data?.map(item => (
                <SwiperSlide key={item?.text}>
                    <div className="img_full">
                        <Image src={item.img} alt="img" fill={true}/>
                    </div>
                    <div className="content" >
                      <h1 >
                        {item.head}
                      </h1>
                      <p>{item.text}</p>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper> }
        
        <Image src={img_4} alt="img" style={{position:"absolute",bottom:"0",left:"0",width:"100%", height:"100px",zIndex:"9" }}/>
    </div>
  )
}

export default LandingPage