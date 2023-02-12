import nc from 'next-connect'
import Post from '../../../../Modal/postModel'
import db from '../../../../utils/dbConnect'


import { isAuth } from '../../../../utils/auth';
import cloudinary from "cloudinary"

cloudinary.config({
  cloud_name: 'dtmjc8y9z',
  api_key: '379966828288349',
  api_secret: 'a41LSvU3XXAJuQOLxorhOVFPauw',
});

const handler = nc();


handler.use(isAuth).put(async (req, res) =>
{
  await db.connect();
  try
  {
    const {id} = req.query
    if(req.body.images){

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
        const post = await Post.findByIdAndUpdate(id,{title,category,summery,content,cover:imagesLinks[0]?.url,author:req.user._id})
        console.log("withImg",id)
        res.status(200).json({
            post
        })
    } else {
        const {title,summery,content,category} = req.body
        const post = await Post.findByIdAndUpdate(id,{title,category,summery,content,author:req.user._id})
        console.log("noImg",id)
        res.status(200).json({
            post
        })
    }
    // Post
    
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
