import {allCategories} from '../../../redux/categorySlice'
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Navigation, Pagination } from "swiper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
 
function Categories() {
    const dispatch = useDispatch()
    const {categories,loading} = useSelector(state => state.category)
    // useEffect(() => {
    //   // dispatch(allCategories())
    // }, [dispatch])
    
    // if(loading) return <>loading ....</>

  return (
    <div className='categories_section' data-aos="fade-up">
        <div className="container">
          <div className="header">
              secoundly, here are <span> our categories </span>
          </div>
          <div className="items">
          {categories && <Swiper
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
          // slidesPerView={4}
          // spaceBetween={30}
          
          // navigation={true} 
          // grabCursor={true}

          // pagination={{
          //     clickable: true,
          // }}
      //   loop={true}
        // modules={[Navigation]}
        // className="mySwiper"
      >
          {categories?.map(cat => (
              <SwiperSlide key={cat._id}>
                  <Link href={`/blogs?category=${cat?.title}`} className="item">
                      <div className="title">  <span>{cat?.title[0]}</span> {cat?.title.slice(1)} </div>
                  </Link>
              </SwiperSlide>
          ))}
          </Swiper>}
        </div>
                
        </div>
    </div>
  )
}

export default Categories