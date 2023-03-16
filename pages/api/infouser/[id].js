import dbConnect from "../../../utils/dbConnect";
import User from '../../../models/User'


const handler = async (req, res) => {
  const { method,query } = req;
  const {id} = req.query
    await dbConnect();
    
        const order = await User.findOne({userID: id })
        if(!order) return res.status(500).json({
          message: 'Not Found'
        })
        res.status(200).json(order);  
  
} 
  export default handler;