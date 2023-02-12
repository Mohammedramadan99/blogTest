import nc from 'next-connect'
import Post from '../../../Modal/postModel'
import db from '../../../utils/dbConnect'

const handler = nc();

import { isAuth } from '../../../utils/auth';


handler.get(async (req, res) =>
{
  await db.connect();
  try
  {
      console.log("id",req.query)
    const {id} = req.query
    const post = await Post.findById(id).populate("author")

    res.status(200).json({
      post
    })
  } catch (err)
  {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
  await db.disconnect();

})

handler.use(isAuth).put(async (req, res) =>
{
  await db.connect();
  try
  {
    let images = [];
    console.log("Boddyy", req.body)
    if (typeof req.body.images === "string")
    {
        images.push(req.body.images);
    } else
    {
        images = req.body.images;
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++)
    {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "blog",
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    req.body.images = imagesLinks;
    const {title,summery,content,category} = req.body
    const post = await Post.create({title,category,summery,content,cover:imagesLinks[0]?.url,author:req.user._id})
    // Post
    res.status(200).json({
      post
    })
  } catch (err)
  {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
  await db.disconnect();

})


export default handler
