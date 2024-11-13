import useGetTransaction from '../../hooks/useGetTransaction';


const BalanceCard = () => {
  
    const {totalBalance} = useGetTransaction();
  
    return (
      <div className="w-96 mx-auto p-4 bg-white shadow-lg rounded-lg">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Total Balance</h2>
          <p className="text-xl font-bold mt-2">${totalBalance}</p>
        </div>
      </div>
    );
  };

  export default BalanceCard;
  