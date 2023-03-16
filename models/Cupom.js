import mongoose from 'mongoose'
// import AutoIncrementFactory from 'mongoose-sequence';

// const AutoIncrement = AutoIncrementFactory(mongoose);

const cupomSchema = new mongoose.Schema({
    _id: Number,
    server_id: String,
    cupom_id: Number,
    nome_cupom: String,
    porcentagem: String,
    data_adicao: Number,
    QuantUse: {type: Number, default: 0 }
});

// cupomSchema.plugin(AutoIncrement, {id: 'cupom_schema'});


const Cupons = mongoose.models.cupom_disponivel || mongoose.model("cupom_disponivel", cupomSchema);

export default Cupons