import nc from 'next-connect'
import Post from '../../../Modal/postModel'
import db from '../../../utils/dbConnect'
import multer from 'multer'
import {isAuth} from '../../../utils/auth'

import cloudinary from "cloudinary"

cloudinary.config({
  cloud_name: 'dtmjc8y9z',
  api_key: '379966828288349',
  api_secret: 'a41LSvU3XXAJuQOLxorhOVFPauw',
});

const handler = nc();

export const config = {
    api: {
      bodyParser: false
    }
  }

handler.use(isAuth).post(async (req, res) =>
{
  await db.connect();
  try
  {
    let images = [];
    console.log( "imagesss", req.body)
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
            folder: "ecommerce",
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    req.body.images = imagesLinks;

    const post = await Post.create({title,summery,content,cover:imagesLinks[0]?.url,author:req.user._id})
    // Post
    res.status(200).json({
      files:req?.file,
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
