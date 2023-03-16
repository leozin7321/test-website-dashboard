import UserWeb from '../../models/User'
import { REST } from '@discordjs/rest';
import * as dotenv from 'dotenv' 
dotenv.config()
import { Routes } from 'discord-api-types/v10';
import dbConnect from "../../utils/dbConnect";
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {

dbConnect()

  if (req.method === "POST") {
   const { userID, password } = req.body

    const users = await UserWeb.find({})
    const user = users.find(u => u.userID === userID && u.Password === password);
if(!user) return res.json({
  message: 'invalid'
})
    const token = jwt.sign({
      id:user.userID,
      username:user.Username,
      avatar: user.Avatar,
      perms: user.Perms
  }, process.env.JWT_SECRET_KEY, {
      expiresIn:'3d'
  })

  res.status(200).json({ 
    message: 'logged',
    token: token,
    dataUser: user
})


        }

    }
