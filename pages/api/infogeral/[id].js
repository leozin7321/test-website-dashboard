import dbConnect from "../../../utils/dbConnect";
import { ProdutoVendido, Carrinho } from '../../../models/Bot'
import Produto from '../../../models/Product'



const handler = async (req, res) => {
  const { method,query } = req;
    await dbConnect();
    
const ProdutosDisponiveis = await Produto.countDocuments({
    server_id: '1055878572302147604'
})
const ProdutosVendidos = await ProdutoVendido.countDocuments({
    server_id: '1055878572302147604'
})
const CarrinhosAbertos = await Carrinho.countDocuments({
    server_id: '1055878572302147604'
})

const order = {
    product: ProdutosDisponiveis,
    product_sell: ProdutosVendidos,
    cart_open: CarrinhosAbertos
}

        res.status(200).json(order);  

} 
  export default handler;