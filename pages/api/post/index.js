import nc from 'next-connect'
import Post from '../../../Modal/postModel'
import db from '../../../utils/dbConnect'

const handler = nc();


import cloudinary from "cloudinary"
import { isAuth } from '../../../utils/auth';

cloudinary.config({
  cloud_name: 'dtmjc8y9z',
  api_key: '379966828288349',
  api_secret: 'a41LSvU3XXAJuQOLxorhOVFPauw',
});

handler.get(async (req, res) =>
{
  await db.connect();
  try
  {
    const posts = await Post.find({}).populate('author').sort({createdAt:-1})

    res.status(200).json({
      posts
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

handler.use(isAuth).post(async (req, res) =>
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
