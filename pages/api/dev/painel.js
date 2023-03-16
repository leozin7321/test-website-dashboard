import dbConnect from "../../../utils/dbConnect";
import User from '../../../models/User'
import { MsgProduto } from '../../../models/Bot'
import Product from '../../../models/Product'

const handler = async (req, res) => {
  const { method,query } = req;
    await dbConnect();
    
    const Products = await Product.find({})   
    const MsgProduct = await MsgProduto.find({})
    const results = await Promise.all([Products, MsgProduct]);
    res.status(200).json(results)
  
} 
  export default handler;