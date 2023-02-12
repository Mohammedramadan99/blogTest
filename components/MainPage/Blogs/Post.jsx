import Image from 'next/image'
import Link from 'next/link'

function Post({post}) {
  return (
    <Link href={`/post/${post._id}`} className="item">
        <div className="images">
            <div className="img">
                <Image src={post?.cover} fill={true} alt="blog" />
            </div>
            <div className="author_img img-rounded">
                <Image src={post?.author?.personalImage?.url} fill={true} alt="blog" />
            </div>
        </div>
        <div className="categories">
            <div className="category"> {post.category} </div>
        </div>
        <div className="title"> {post.title} </div>
        <div className="content"> {post.summery?.slice(0,200)} {post.summery.length > 200 && '...'} </div>
    </Link>  
    )
}

export default Post