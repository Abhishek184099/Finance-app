import React, { useState } from 'react';
import useTransaction from '../../hooks/useTransaction';
import useGetTransaction from '../../hooks/useGetTransaction';


const ExpenseCard = () => {

    const {addTransaction} = useTransaction();

    const { transaction, totalExpense, getTransaction } = useGetTransaction(); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    date: '',
    category: '',
    type : 'expense',
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    await addTransaction(formData)
    getTransaction();
    handleCloseModal();
  };

  return (
    <div className="w-96 mx-auto p-4 bg-white shadow-xl shadow-gray-500 rounded-lg ">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Total Expenses</h2>
        <p className="text-xl font-bold mt-2">${totalExpense}</p> {/* You can dynamically load total expenses here */}
        <button
          onClick={handleOpenModal}
          className="mt-4 px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-700"
        >
          Add Expense
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">Add Expense</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="food">Food</option>
                  <option value="rent">Rent</option>
                  <option value="entertainment">Entertainment</option>
                </select>
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-700"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-700"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseCard;
