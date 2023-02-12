import { FilteredPosts } from '@/redux/postSlice'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Category() {
    const router = useRouter()
    const {posts} = useSelector(state => state.posts)
    const dispatch = useDispatch()
    const {name} = router.query
    // console.log(router)
    useEffect(() => {
        name && dispatch(FilteredPosts(name))
    },[dispatch,name])
  return (
    <div> 
      {posts?.map(p => (
        <div key={p._id}>
          {p.title}
          <br />
          category: {p.category}
        </div>
      ))}  
    </div>
  )
}

export default Category