import dbConnect from "../../../utils/dbConnect";
import { BotSettings } from '../../../models/Bot'
import UserWeb from '../../../models/User'

const handler = async (req, res) => {
  const { method,query } = req;
    await dbConnect();
        const order = await BotSettings.findOne({ bot_id: '1055925091189399652' })
        if(!order) return res.status(500).json({
          message: 'Not Found'
        })
        // const test = await UserWeb.create({
        //   userID: '544293672095580180',
        //   Username: 'Leozin#8481',
        //   Password: '1',
        //   Avatar: 'https://cdn.discordapp.com/avatars/544293672095580180/a_3a4f0509681d192f95e1b29aa119b1b1.gif?size=2048'
        // })
        res.status(200).json(order);  




} 
  export default handler;