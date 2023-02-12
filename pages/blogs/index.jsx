import Post from '../../components/MainPage/Blogs/Post'
import { FilteredPosts } from '../../redux/postSlice'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Blogs() {
  const router = useRouter()
  const {category} = router.query
  const dispatch = useDispatch()
  const {posts} = useSelector(state => state.posts)
  useEffect(() => {
    dispatch(FilteredPosts(category))
    // dispatch(FilteredPosts())
  }, [dispatch,category])
  // if(!category){
    // dispatch(FilteredPosts())
  // }
  return (
    <div className='blogs'>
      <div className="header">
        <div className="circle">
          <div className="text">
            {!category && (
              <>
                <span> B </span>logs
              </>
            )}
            <span>{category&& category[0]}</span>{category?.slice(1)}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="head">
          {!category ? (
            <>
              all <span> posts </span>
            </>
          ) : (
            <>
            posts related to <span> {category && category} </span>
            </>
          )}
          
        </div>
        <div className="items">
          {posts?.map(p => (
            <div key={p._id} className="item">
              <Post post={p}/>
            </div>
          ))}  
        </div>
      </div>
    </div>
  )
}


export default Blogs