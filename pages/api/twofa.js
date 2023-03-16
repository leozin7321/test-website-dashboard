import Users from '../../models/User'
import dbConnect from "../../utils/dbConnect";

export default async function handler(req, res) {

dbConnect()

  if (req.method === "POST") {
    const id = req.body.id
   const resulted = req.body.result

  await Users.findOneAndUpdate({userID: id}, {$set: { 'fa': resulted }}) 
   
        res.status(200).json()
        }

    }
