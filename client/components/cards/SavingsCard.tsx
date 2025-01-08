const SavingsCard = () => {
  return (
    <div className="bg-gray-950/60 mt-2 p-4 rounded-lg shadow-lg border border-white h-full w-[250px] md:w-[300px] max-w-[90%] md:max-w-[500px] mx-auto">
      <div className="flex flex-col gap-4 text-white">
        {/* Expense List */}
        <div className="flex flex-col border border-white/30 p-4 rounded-lg gap-2">
          <div className="flex justify-between hover:text-blue-500">
            <span>Food</span> <span>2000</span>
          </div>
          <div className="flex justify-between hover:text-blue-500">
            <span>Rent</span> <span>5000</span>
          </div>
          <div className="flex justify-between hover:text-blue-500">
            <span>Travel</span> <span>1000</span>
          </div>
          <div className="flex justify-between hover:text-blue-500">
            <span>Entertainment</span> <span>2000</span>
          </div>
          <div className="flex justify-between hover:text-blue-500">
            <span>Other</span> <span>2000</span>
          </div>
        </div>

        {/* Total */}
        <div className="text-center text-lg font-medium hover:text-blue-500">
          Total: <span className="font-bold">12000</span>
        </div>
      </div>
    </div>
  );
};

export default SavingsCard;
