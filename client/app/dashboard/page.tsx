import { Chart } from "@/components/ExpenseChart";
import ExpenseTable from "@/components/ExpenseTable";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaHouseChimneyUser } from "react-icons/fa6";
const Dashboard = () => {
  const expenses = [
    { date: "2023-10-01", type: "Food", amount: 50.0 },
    { date: "2023-10-02", type: "Transport", amount: 20.0 },
    { date: "2023-10-03", type: "Utilities", amount: 100.0 },
    { date: "2023-10-04", type: "Entertainment", amount: 75.0 },
    { date: "2023-10-05", type: "Health", amount: 150.0 },
    { date: "2023-10-06", type: "Food", amount: 60.0 },
    { date: "2023-10-07", type: "Transport", amount: 25.0 },
    { date: "2023-10-08", type: "Utilities", amount: 110.0 },
    { date: "2023-10-09", type: "Entertainment", amount: 80.0 },
    { date: "2023-10-10", type: "Health", amount: 160.0 },
    { date: "2023-10-11", type: "Food", amount: 55.0 },
    { date: "2023-10-12", type: "Transport", amount: 30.0 },
    { date: "2023-10-13", type: "Utilities", amount: 120.0 },
    { date: "2023-10-14", type: "Entertainment", amount: 85.0 },
    { date: "2023-10-15", type: "Health", amount: 170.0 },
  ];
  return (
    <div className="flex h-full bg-gray-800 flex-col">
      <div className="flex w-full p-4 gap-2 flex-col md:flex-row">
        {/* Card 1 */}
        <div className="bg-blue-800/25 text-white text-lg font-semibold rounded-2xl w-full h-[150px] flex justify-between items-center p-4 shadow-lg">
          <div>
            <span className="text-sm font-bold text-gray-300 block">
              Welcome
            </span>
            <span className="text-3xl font-bold text-blue-400 mt-1 block">
              Pratheep.Srikones
            </span>
            <button className="bg-blue-600 text-white text-sm py-2 px-4 rounded-md hover:bg-blue-950 transition duration-300 mt-3">
              View Profile {">>"}
            </button>
          </div>
          <FaHouseChimneyUser className="hidden md:flex w-16 h-16 mr-10" />
        </div>

        {/* Card 2 */}
        <div className="bg-blue-800/25 text-white text-lg font-semibold rounded-2xl w-full h-[150px] flex justify-between items-center p-4 shadow-lg">
          <div>
            <span className="text-sm font-bold text-gray-300 block">
              Amount Spent this Month:
            </span>
            <span className="text-3xl font-bold text-blue-400 mt-1 block">
              6000 LKR
            </span>
            <button className="bg-blue-600 text-white text-sm py-2 px-4 rounded-md hover:bg-blue-950 transition duration-300 mt-3">
              More Details
            </button>
          </div>
          <FaMoneyBillTrendUp className="hidden md:flex w-16 h-16 mr-10" />
        </div>
      </div>

      <div className="p-2 bg-blue-800/25 rounded-xl m-4 shadow-lg flex flex-col md:flex-row gap-4">
        {/* Monthly Expenses Section */}
        <div className="w-auto md:w-[750px] max-w-full">
          <h1 className="text-2xl text-white font-bold pb-1">
            Monthly Expenses
          </h1>
          <span className="bg-blue-500 h-[10px] w-16 sm:w-20 lg:w-24 block mb-3 md:mb-6 rounded-2xl"></span>
          <Chart />
        </div>

        {/* Recent Transactions Section */}
        <div className="w-auto md:w-[750px] max-w-full">
          <h1 className="text-2xl text-white font-bold pb-1">
            Recent Expenses
          </h1>
          <span className="bg-blue-500 h-[10px] w-20 sm:w-20 lg:w-24 block mb-3 md:mb-6 rounded-2xl"></span>
          <div className="overflow-y-auto max-h-[400px]">
            <ExpenseTable expenses={expenses} />
          </div>
        </div>
      </div>
      <button className="fixed bottom-8 right-8 md:right-10 bg-blue-600/40 text-white text-lg font-bold py-3 px-6 rounded-full shadow-lg hover:bg-blue-950 transition duration-300">
        + Add Expense
      </button>
    </div>
  );
};

export default Dashboard;
