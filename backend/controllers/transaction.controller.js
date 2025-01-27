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

const getTransaction = async (req, res) => {
    try {
      const userId = req.user._id;
      const { category } = req.query;
  
      let query = { userId: userId };
      if (category) {
        query.category = category;
      }
  
      let transactions = await Transaction.find(query);
  
      if (!transactions || transactions.length === 0) {
        return res.status(400).json({ error: "No transactions found for the given category" });
      }
  
      return res.status(200).json(transactions);
    } catch (err) {
      console.error("error at getTransaction controller:", err.message);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  

module.exports = {
    addTransaction,
    getTransaction,
}