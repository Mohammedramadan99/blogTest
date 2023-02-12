import nc from 'next-connect'
const handler = nc();

import db from '../../../utils/dbConnect'
import Category from '../../../Modal/CategoryModal';

handler.get(async (req, res) =>
{
  await db.connect();
  try
  {
    const categories = await Category.find()
    res.status(200).json({
        categories
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

handler.post(async (req, res) =>
{
  await db.connect();
  try
  {
    const category = await Category.create({title:req.body.title})
    // Post
    res.status(200).json({
      category
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
