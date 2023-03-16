import Users from '../../models/User'
import dbConnect from "../../utils/dbConnect";

export default async function handler(req, res) {

dbConnect()

  if (req.method === "POST") {
   const senhaAntiga =  req.body.antigaSenha 
   const senha = req.body.novaSenha

   const id = req.body.id
   const users = await Users.findOne({ userID: id})
   if(users.Password !== senhaAntiga) {
    return res.status(200).json({
      message: 'notaccepted,501'
    })
   }
  await Users.findOneAndUpdate({userID: id}, {$set: { 'Password': senha }}) 
   
        res.status(200).json({
          message: 'accepted,200'
        })
        }

    }
