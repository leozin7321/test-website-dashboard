import dbConnect from "../../../utils/dbConnect";
import User from '../../../models/User'
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';

const handler = async (req, res) => {
  const { method,query } = req;
  const {id} = req.query
    await dbConnect();
    var option; 
        const order = await User.findOne({userID: id })
        if(!order) return res.status(404)
        if(order.fa == true){

            
    const rest = new REST({ version: '10' }).setToken('ODI5MzYxODk0NjgxNzM5Mjc3.GNqoZ_.EuccS9XHkh_SZUZ-zIyEZJaHmYNKLKd-Vyq2ZY');

    const test = await rest.post(Routes.userChannels(), {
      body: { 
      
        recipient_id: id
      },
          
    })
    
            await rest.post(Routes.channelMessages('858543418791165963'), {
                body: {
                    content: '**`[2FA] Foi solicitado o login na sua conta do LaionBOT, aceitar liberar? (Após você escolher, tem 2 minutos para verificar no site a sua escolha!)`**',
                    "components": [
                      {
                          "type": 1,
                          "components": [
                              {
                                  "type": 2,
                                  "label": "Confirmar!",
                                  "style": 3,
                                  "custom_id": "confirm_login"
                              },
                              {
                                "type": 2,
                                "label": "Negar!",
                                "style": 4,
                                "custom_id": "no_login"
                            }
                          ]
                        
                      }
                  ],
                },
            });
        
            return res.status(200).json('true')
        } else if(order.fa == false){
            return  res.status(200).json('false')
        } 
  
}
  export default handler;