import { allCategories } from '../../redux/categorySlice'
import { createPost, reset } from '../../redux/postSlice'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
// import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useDispatch, useSelector } from 'react-redux'
function NewBlog() {

    const dispatch = useDispatch()
    const router = useRouter()
    const {isCreated} = useSelector(state => state.posts)
    const {categories} = useSelector(state => state.category)
    const [title,setTitle] = useState('')
    const [summery,setSummery] = useState('')
    const [content, setContent] = useState('')
    const [category, setCategory] = useState('')
    const [images,setImages] = useState('')
    const [imagesPreview, setImagesPreview] = useState('')

    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);

    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
    }

    const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
    ]
    const submitHandler = (e) => {
        e.preventDefault()
        // const data = new FormData()
        // data.append('title',title)
        // data.append('summery',summery)
        // data.append('content',content)
        // data.append('images',images)
        const data = {
          title,summery,content,images,category
        }
        dispatch(createPost(data)) 
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
      if(isCreated){
        dispatch(reset())
        router.push('/')
      }
    }, [dispatch,isCreated])
    useEffect(() => {
      dispatch(allCategories())
    }, [dispatch])
    
  return (
    <div className='newBlog'>
        <div className="container">
            <form onSubmit={submitHandler}>
                <input type="title" placeholder='title' onChange={(e) => setTitle(e.target.value)} />
                <input type="summery" placeholder='summery' onChange={(e) => setSummery(e.target.value)} />
                <input type="file" onChange={createPostImagesChange} />
                <div className="categories">
                  <p> category </p> 
                  <select onChange={e => setCategory(e.target.value)}>
                    {categories?.map(category => (
                      <option key={category._id} className="category">
                        {category?.title}
                      </option>
                  ))}
                  </select>
                </div>
                <ReactQuill value={content} modules={modules} formats={formats} onChange={(newValue) => setContent(newValue)} />
                <button> create post </button>
            </form>
        </div>

    </div>
  )
}

export default NewBlog