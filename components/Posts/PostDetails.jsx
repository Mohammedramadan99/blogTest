import { getPostDetails } from '../../redux/postSlice'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {FaEdit, FaFacebook,FaLinkedinIn,FaYoutube} from 'react-icons/fa'
import Link from 'next/link'
import moment from 'moment'
// import { LinkedIn } from '@mui/icons-material'

const PostDetails = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const {postDetails,loading} = useSelector(state => state.posts)
    const {userAuth} = useSelector(state => state.users)
    const {id} = router.query
    useEffect(() => {
        // imp to check here also if that id is exsist
        id && dispatch(getPostDetails(id))
    },[dispatch,id])
    
    if(loading) return 'loading ....'
    
    if(!postDetails) return ''

    return( 
        <div className='postDetails'>
            <div className="image img-fullWidth">
                <Image src={postDetails?.cover} fill={true} alt="img" />
            </div>
            <div className="container">
                <div className="post_part">
                    <h1 className="title">
                        {postDetails?.title}
                    </h1>
                    <div className="row_info">
                        <div className="createdAt">
                            {moment(postDetails.createdAt).fromNow()}
                            {/* {postDetails.createdAt} */}
                        </div>
                        <Link href={`/blogs?category=${postDetails?.category}`} className="category">
                            {postDetails?.category}
                        </Link>
                        <div className="author">
                            @{postDetails?.author?.name}
                        </div>
                        {postDetails?.author?._id === userAuth?._id && (
                            <Link href={`/post/edit/${postDetails?._id}`} className="edit">
                                <FaEdit/>
                                edit
                            </Link>
                        )}
                    </div>
                    <div dangerouslySetInnerHTML={{__html:postDetails?.content}} className="content" />
                </div>
                <div className="author_part">
                    <div className="image">
                        {postDetails?.author && <Image src={postDetails?.author?.personalImage?.url} width={150} height={150} style={{borderRadius:"50%"}} alt="img" />}
                    </div>
                    <div className="name"> hi, i am mohammed </div>
                    <p className="bio"> passionate frontend developer with 10 years of experience with building user interfaces </p>
                    <div className="socialMedia">
                        <div className="item">
                            <FaFacebook/>
                        </div>
                        <div className="item">
                            <FaLinkedinIn/>
                        </div>
                        <div className="item">
                            <FaYoutube/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PostDetails