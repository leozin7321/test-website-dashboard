import dbConnect from "../../utils/dbConnect";
import User from '../../models/User'


const handler = async (req, res) => {
    await dbConnect();
    
        const order = await User.find({})
        res.status(200).json(order);
}
  export default handler;