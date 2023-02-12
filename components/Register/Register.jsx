import { registerUserAction } from '../../redux/usersSlice';
import Image from 'next/image';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

function Register() {
    const dispatch = useDispatch()
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    console.log(imagesPreview)
    const submitHandler = e =>
    {
      e.preventDefault()
      const userData = { name, email, password, images }
      dispatch(registerUserAction(userData))
    console.log(userData)
    }
    const createProductImagesChange = (e) =>
    {
      const files = Array.from(e.target.files);
  
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
  return (
    <div className='register'>
        <form onSubmit={submitHandler}>
            <h1>register</h1>
            
            <input type="text" placeholder='name' onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder='email' onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)} />
            
            <div style={{paddingBottom:"10px"}}>
              size should be less than <span style={{color:"#ef233c",fontWeight:"700"}}>1MB </span> 
            </div>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={createProductImagesChange}
              multiple
            />
            {imagesPreview.length > 0 && (
                <div className="img-rounded">
                    <Image src={imagesPreview[0]} fill={true} alt="img" />
                </div>
            )}
            <input type="submit" className='submit-btn' value="register" />
        </form>
    </div>
  )
}

export default Register