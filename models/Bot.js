import mongoose from 'mongoose'
import AutoIncrementFactory from 'mongoose-sequence';

const pagamentoSchema = new mongoose.Schema({
    _id: Number,
    server_id: String,
    user_id: String,
    pagamento_confirmado: Boolean,
    data: String,
    quantidade_produtos_vendidos: Number,
    valor: Number,
});


const produtoEstoqueSchema = new mongoose.Schema({
    produtoId: Number,
    server_id: String,
    conteudo: String,
    data_adicao: Number,
});

const msgProdutoSchema = new mongoose.Schema({
    canal_id: String,
    msg_id: String,
    server_id: String,
    produtoId: Number,
});


const carrinhoSchema = new mongoose.Schema({
    server_id: String,
    user_id: String,
    msg_carrinho_status: String,
    cupom_system: String, 
    cupom_nome: String,
    produtos: [
        // Produtos no carrinho da pessoa
        {
            msg_produto_id: String,
            produto_id: Number,
            produto_nome: String,
            produto_conteudo: String,
            produto_valor: Number,
            produto_data_adicao: Number,
        }
    ]
});

const produtoVendidoSchema = new mongoose.Schema({
    server_id: String,
    quantidade: { type: Number, default: 0 },
    user: String,
    data: Number,
    id: { type: Number, ref: 'Usuario',},
    nome: { type: String,  ref: 'Produto'}  // Usado quando o id do produto for apagado
});

const botSettingsSchema = new mongoose.Schema({
    bot_id: String,
    bot_name: String, 
    bot_avatar: String, 
    defi_manu: Boolean,
    bans_bot: Array
})



const Pagamento = mongoose.models.pagamento || mongoose.model("pagamento", pagamentoSchema);

const ProdutoEstoque = mongoose.models.produto_estoque || mongoose.model("produto_estoque", produtoEstoqueSchema);
const MsgProduto = mongoose.models.mensagem_produto || mongoose.model("mensagem_produto", msgProdutoSchema);
const Carrinho = mongoose.models.carrinho || mongoose.model("carrinho", carrinhoSchema);
const ProdutoVendido = mongoose.models.produto_vendido || mongoose.model("produto_vendido", produtoVendidoSchema);

const BotSettings = mongoose.models.bot_settings || mongoose.model("bot_settings", botSettingsSchema);
export { Pagamento,  ProdutoEstoque, MsgProduto, Carrinho, ProdutoVendido, BotSettings }
