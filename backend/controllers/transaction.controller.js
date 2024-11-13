const Transaction = require("../model/Transaction")

const addTransaction = async(req,res) => {
    try{
       const {name,type,amount,date,category} = req.body;
       const userId = req.user._id;


       if(!name  || !type || !amount || !date || !category) {
        return res.status(400).json({error : "All fields are required"});
       }

       const newTransaction = new Transaction({
        userId,
        name,
        type,
        amount,
        date,
        category,
       })

       await newTransaction.save()

      return res.status(200).json(newTransaction)


    }
    catch(err){
       console.error("error on addtransaction controller :",err.message)
       return res.status(500).json({error: "Internal server error"})
    }  
}

const getTransaction = async(req,res) => {
      try{
          const userId = req.user._id;
          let transaction = await Transaction.find({userId : userId});
          if(!transaction){
            return res.status(400).json({error: "no transaction found"})
          }

          return res.status(200).json(transaction);
      }
      catch (err){
          console.error("error at getTransaction controller :",err.message)
          return res.status(500).json({error : "Internal server error"});s
      }
}

module.exports = {
    addTransaction,
    getTransaction,
}