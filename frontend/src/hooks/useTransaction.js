import { useState } from "react";
import toast from "react-hot-toast";

const useTransaction = () => {

    const addTransaction = async({name,type,date,amount,category}) => {

        console.log("hello");
        let success =  handleInputErrors({name,type,date,amount,category});
        if (!success) {
            return;
        }

        try{
            const res = await fetch('/api/addtransaction',{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({name,type,date,amount,category})  
            });

            const data = res.json();
            if (data.error) {
                throw new Error(data.error);
              }
            else{
                toast.success("transaction added successfully");
            }
        
        }
        catch(err){
           toast.error(err.message)
        }
    } 
  return {addTransaction};

}

export default useTransaction;

const handleInputErrors = ({name,type,date,amount,category}) => {
    if (!name || !type || !date || !amount || !category) {
        toast.error("Please fill in all fields")
        return false;
    }	

    return true;
}

