const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TransactionSchema = Schema({
    userId : {
        type : ObjectId,
        required : true,
    },
    name : {
        type : String,
        required : true,
    },
    type : {
        type: String,
        required : true,
    },
    amount : {
        type : Number,
        required : true,
    },
    date : {
        type : Date,
        required : true,
    },
    category : {
        type : String,
        required: true,
    }
},{timeStamp : true});

const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction;


