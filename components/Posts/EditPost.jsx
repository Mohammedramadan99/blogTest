import { allCategories } from '@/redux/categorySlice'
import { updatePostAction,getPostDetails, reset } from '@/redux/postSlice'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
// import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useDispatch, useSelector } from 'react-redux'
import Editor from './Editor'
function EditPost() {

    const dispatch = useDispatch()
    const router = useRouter()
    const {id} = router.query
    const {isUpdated,postDetails} = useSelector(state => state.posts)
    const {categories} = useSelector(state => state.category)
    const [title,setTitle] = useState('')
    const [summery,setSummery] = useState('')
    const [content, setContent] = useState('')
    const [category, setCategory] = useState('')
    const [images,setImages] = useState('')
    const [imagesPreview, setImagesPreview] = useState('')

    

    const submitHandler = (e) => {
        e.preventDefault()
        // const data = new FormData()
        // data.append('title',title)
        // data.append('summery',summery)
        // data.append('content',content)
        // data.append('images',images)
        const img = images.length > 0 && images
        const data = {
            id,
            post:{title,summery,content,images:img,category}
        }
        dispatch(updatePostAction(data)) 
    }
    const createPostImagesChange = (e) =>
    {
        const files = Array.from(e?.target?.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) =>
        {
            const reader = new FileReader();

            reader.onload = () =>
            {
                if (reader.readyState === 2)
                {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };
    useEffect(() => {
      if(isUpdated){
        dispatch(reset())
        router.push('/')
      }
    }, [dispatch,isUpdated])

    useEffect(() => {
      dispatch(allCategories())
      id && dispatch(getPostDetails(id))
      
    }, [dispatch,id])
    useEffect(() => {
        if(postDetails){
            setTitle(postDetails?.title)
            setSummery(postDetails?.summery)
            setCategory(postDetails?.category)
            setContent(postDetails?.content)
          }
    },[postDetails])
  return (
    <div className='editPost'>
        <div className="container">
          <div className='title'>
            edit post
          </div>
          <form onSubmit={submitHandler}>
              <input type="title" value={title} placeholder='title' onChange={(e) => setTitle(e.target.value)} />
              <input type="summery" value={summery} placeholder='summery' onChange={(e) => setSummery(e.target.value)} />
              <input type="file" onChange={createPostImagesChange} />
              <div className="categories">
                <p> category </p> 
                <select onChange={e => setCategory(e.target.value)}>
                  {categories?.map(category => (
                    <option key={category._id}  className="category">
                      {category?.title}
                    </option>
                  ))}
                </select>
              </div>
              <Editor value={content} onChange={setContent} />
              <button> create post </button>
          </form>
        </div>

    </div>
  )
}

export default EditPost