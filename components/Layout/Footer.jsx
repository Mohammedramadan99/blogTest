import moment from 'moment/moment'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import Logo from './Logo'

function Footer() {
  const {posts} = useSelector(state => state.posts)
  const {categories} = useSelector(state => state.category)
  const latestPosts = [posts[0],posts[1],posts[2]]
  return (
    <div className='footer'>
        <div className="container">
            <div className="col">
              <Logo size="md" />
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod</p>
            </div>
            <div className="col">
              <div className="title head_dark-hover">
                  latest posts
              </div>
              <div className="latest">
                <div className="posts">
                  {latestPosts?.map(p => (
                    <Link href={`blogs?category=${p?.category}`} key={p?._id} className="post" >
                      <div className="img">
                        <Image src={p?.cover} width={50} height={50} style={{objectFit:"cover",borderRadius:"50%"}} alt="img" />
                      </div>
                      <div className="text">
                        <div className="title head_dark-hover">
                          {p?.title}
                        </div>
                        <div className="date">
                        {moment(p?.createdAt)?.fromNow()}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="col">
              <div className="title head_dark-hover">
                  tags
              </div>
              <div className="categories">
                  {categories?.map(category => (
                    <Link key={category?._id} href={`/blogs?category=${category?.title}`} className="category">
                      {category?.title}
                    </Link>
                  ))}
              </div>
            </div>
            <div className="col">
              <div className="title head_dark-hover">
                newsletter
              </div>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit</p>
              <form>
                <input type="text" placeholder='Your E-mail' />
                <input type="submit" />
              </form>
            </div>
        </div>
    </div>
  )
}

export default Footer