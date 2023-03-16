import mongoose from 'mongoose'
// import AutoIncrementFactory from 'mongoose-sequence';

// const AutoIncrement = AutoIncrementFactory(mongoose);

const produtoSchema = new mongoose.Schema({
    _id: { type: Number, unique: true },
    server_id: String,
    nome: String,
    image: String,
    cor: String,
    valor: Number,
    quantidade: { type: Number, default: 0 }
});

// produtoSchema.plugin(AutoIncrement, {id: 'product', inc_field: '_id'});

const Produto = mongoose.models.produto || mongoose.model("produto", produtoSchema);
export default Produto