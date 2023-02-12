import nc from 'next-connect'
import db from '../../../../utils/dbConnect'
import Post from '../../../../Modal/postModel'

const handler = nc();

handler.get(async (req, res) =>
{
  await db.connect();
  try
  {
    const {category} = req.query
    console.log(category)
    // const cat = `${category}`
    const posts = await Post.find({category})
    // const categories = await Category.find()
    res.status(200).json({
        posts
        // categories
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
