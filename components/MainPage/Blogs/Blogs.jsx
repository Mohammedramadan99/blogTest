
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation,  } from "swiper";
// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { allPosts } from "../../../redux/postSlice";
import dynamic from "next/dynamic";
// import Post from "./Post";
const Post = dynamic(() => import('./Post'), {
  ssr: false,
})
function Blogs() {
    // const dispatch = useDispatch()
    const {posts,loading} = useSelector(state => state.posts)
    
    

    // if(loading) return <>loading ....</>
  return (
    <div className='blogsSlider'>
        <div className="container">
            <div className="header">
                first, see our <span> best stories </span>
            </div>
            <div className="items">
            {/* check of posts is exist first to avoid any error about swiper slide class */}
            {posts && <Swiper 
                // slidesPerView={3}
                spaceBetween={30}
                slidesPerView={1}
                slidesPerGroup={1}
                navigation={true} 
                grabCursor={true}
                modules={[Navigation]}
                className="mySwiper"
                breakpoints={{
                    640:{
                      slidesPerView:2,
                      spaceBetween:10
                    },
                    768:{
                      slidesPerView:3,
                      spaceBetween:20
                    },
                    1024:{
                      slidesPerView:3,
                      spaceBetween:30
                    }
                  }}          
            >
                {posts?.map(post => (
                    <SwiperSlide key={post._id}>
                        <Post post={post}/>
                    </SwiperSlide>
                ))}
            </Swiper>}
        </div>
        </div>
    </div>
  )
}

export default Blogs