import dbConnect from "../../../../utils/dbConnect";
import User from '../../../../models/User'
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';

const handler = async (req, res) => {
  const { method,query } = req;
  const {id} = req.query
    await dbConnect();
let option = null
        const order = await User.findOne({userID: id })
        if(!order) return res.status(404).json(option)
        if(order.ResultFa == 'confirm_login'){
          option = 'confirm_login'
          return res.status(200).json(option)
        } else if(order.ResultFa == 'no_login'){
          option = 'no_login'
          return res.status(200).json(option)
        } else if(order.ResullFa == null){
          option = 'not_response'
          return res.status(200).json(option)
        }
        
  
}
  export default handler;

   