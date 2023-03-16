import User from '../../../../models/User'
import dbConnect from "../../../../utils/dbConnect";

const handler = async (req, res) => {
  const { method,query } = req;
  const {id} = req.query
    await dbConnect();
await User.findOneAndUpdate({userID: id}, {$set: { 'ResultFa': null }}) 
res.status(200).json(true)
  
}
  export default handler;

   