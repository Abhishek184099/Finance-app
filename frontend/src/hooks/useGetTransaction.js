import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGetTransaction = () => {
  const { authUser } = useAuthContext();
  const [transaction, setTransaction] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const getTransaction = async () => {
    try {
      const res = await fetch("/api/gettransaction");
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      } else {
        setTransaction(data);
        console.log("Transaction Data:", data); // Debugging: Log the fetched data
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Fetch transactions on component mount
  useEffect(() => {
    getTransaction();
  }, []); // Removed `transaction` from dependencies to avoid infinite re-renders

  // Calculate total income and expense
  useEffect(() => {
    const calculateTotals = () => {
      let income = 0;
      let expense = 0;

      transaction.forEach((t) => {
        if (t.type === "income") {
          income += t.amount;
        } else if (t.type === "expense") {
          expense += t.amount;
        }
      });

      // Update total income and expense
      setTotalIncome(income);
      setTotalExpense(expense);
    };

    calculateTotals();
  }, [transaction]); // Recalculate totals when `transaction` changes

  // Update total balance
  useEffect(() => {
    setTotalBalance(totalIncome - totalExpense);
  }, [totalIncome, totalExpense]);

  return { transaction, totalIncome, totalExpense, getTransaction, totalBalance };
};

export default useGetTransaction;