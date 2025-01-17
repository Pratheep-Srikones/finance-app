"use client";
import { Chart } from "@/components/Charts/ExpenseChart";
import ExpenseTable from "@/components/Tables/RecentExpenseTable";
import { user_id, year, month } from "@/data/data";
import {
  addExpense,
  getLatestExpenseByUserId,
  getTotalExpenseByMonth,
} from "@/services/expense.services";
import { Expense } from "@/types/types";
import { convertMonthData } from "@/utils/convert";
import { notifyError, notifySuccess } from "@/utils/notify";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaHouseChimneyUser } from "react-icons/fa6";
import { ToastContainer } from "react-toastify";
const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [expense, setExpense] = useState<Expense>({
    type: "",
    amount: 0,
    description: "",
    happened_at: "",
    expense_id: "",
    user_id: "",
  });
  // const expenses = [
  //   {
  //     expense_id: "1",
  //     happened_at: "2023-10-01",
  //     type: "Food",
  //     amount: 50.0,
  //     description: "Groceries",
  //     user_id: "2",
  //   },
  //   {
  //     expense_id: "2",
  //     happened_at: "2023-10-02",
  //     type: "Transport",
  //     amount: 20.0,
  //     description: "Bus fare",
  //     user_id: "2",
  //   },
  //   {
  //     expense_id: "3",
  //     happened_at: "2023-10-03",
  //     type: "Utilities",
  //     amount: 100.0,
  //     description: "Electricity bill",
  //     user_id: "2",
  //   },
  //   {
  //     expense_id: "4",
  //     happened_at: "2023-10-04",
  //     type: "Entertainment",
  //     amount: 75.0,
  //     description: "Movie tickets",
  //     user_id: "2",
  //   },
  //   {
  //     expense_id: "5",
  //     happened_at: "2023-10-05",
  //     type: "Health",
  //     amount: 150.0,
  //     description: "Doctor visit",
  //     user_id: "2",
  //   },
  //   {
  //     expense_id: "6",
  //     happened_at: "2023-10-06",
  //     type: "Food",
  //     amount: 60.0,
  //     description: "Dining out",
  //     user_id: "2",
  //   },
  //   {
  //     expense_id: "7",
  //     happened_at: "2023-10-07",
  //     type: "Transport",
  //     amount: 25.0,
  //     description: "Taxi fare",
  //     user_id: "2",
  //   },
  //   {
  //     expense_id: "8",
  //     happened_at: "2023-10-08",
  //     type: "Utilities",
  //     amount: 110.0,
  //     description: "Water bill",
  //     user_id: "2",
  //   },
  //   {
  //     expense_id: "9",
  //     happened_at: "2023-10-09",
  //     type: "Entertainment",
  //     amount: 80.0,
  //     description: "Concert tickets",
  //     user_id: "2",
  //   },
  //   {
  //     expense_id: "10",
  //     happened_at: "2023-10-10",
  //     type: "Health",
  //     amount: 160.0,
  //     description: "Medication",
  //     user_id: "2",
  //   },
  //   {
  //     expense_id: "11",
  //     happened_at: "2023-10-11",
  //     type: "Food",
  //     amount: 55.0,
  //     description: "Groceries",
  //     user_id: "2",
  //   },
  //   {
  //     expense_id: "12",
  //     happened_at: "2023-10-12",
  //     type: "Transport",
  //     amount: 30.0,
  //     description: "Train fare",
  //     user_id: "2",
  //   },
  //   {
  //     expense_id: "13",
  //     happened_at: "2023-10-13",
  //     type: "Utilities",
  //     amount: 120.0,
  //     description: "Gas bill",
  //     user_id: "2",
  //   },
  //   {
  //     expense_id: "14",
  //     happened_at: "2023-10-14",
  //     type: "Entertainment",
  //     amount: 85.0,
  //     description: "Theater tickets",
  //     user_id: "2",
  //   },
  //   {
  //     expense_id: "15",
  //     happened_at: "2023-10-15",
  //     type: "Health",
  //     amount: 170.0,
  //     description: "Dental checkup",
  //     user_id: "2",
  //   },
  // ];

  const [monthTotals, setMonthTotals] = useState<
    { month: number; total: number }[]
  >([]);
  useEffect(() => {
    const fetchMonthTotalsData = async () => {
      try {
        const monthTotalData = await getTotalExpenseByMonth(user_id!, year);
        setMonthTotals(monthTotalData);
      } catch (error) {
        console.error("Error fetching month totals:", error);
      }
    };
    try {
      fetchMonthTotalsData();
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  }, []);
  const chartData = convertMonthData(monthTotals);

  const [expenses, setExpenses] = useState<Expense[]>([]);
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const expenses = await getLatestExpenseByUserId(user_id!);
        setExpenses(expenses);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    try {
      fetchExpenses();
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  }, []);

  const handleAddExpense = async () => {
    if (!expense.type || !expense.amount) {
      notifyError("Please fill all the fields");
      return;
    }

    try {
      addExpense(expense)
        .then(() => {
          notifySuccess("Expense Added Successfully");
          setModalOpen(false);
          setExpense({
            type: "",
            amount: 0,
            description: "",
            happened_at: "",
            expense_id: "",
            user_id: "",
          });
        })
        .catch((error) => {
          notifyError("Failed to add expense: " + error);
        });
    } catch (error) {
      notifyError("Failed to add expense: " + error);
    }
  };
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
            <Link href={"/user"}>
              <button className="bg-blue-600 text-white text-sm py-2 px-4 rounded-md hover:bg-blue-950 transition duration-300 mt-3">
                View Profile {">>"}
              </button>
            </Link>
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
              {monthTotals.length > 0 ? monthTotals[month - 1].total : 0} LKR
            </span>
            <Link href={"/expenses"}>
              <button className="bg-blue-600 text-white text-sm py-2 px-4 rounded-md hover:bg-blue-950 transition duration-300 mt-3">
                More Details
              </button>
            </Link>
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
          <Chart data={chartData} />
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
      <button
        className="fixed bottom-8 right-8 md:right-10 bg-blue-600/60 text-white text-lg font-bold py-3 px-6 rounded-full shadow-lg hover:bg-blue-950 transition duration-300 hover:after:content-['+_Add_Expense'] after:content-['+']"
        onClick={() => setModalOpen(true)}
      />

      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900/80 flex justify-center items-center">
          <div className="w-auto md:w-[360px] h-auto bg-gray-900 rounded-xl">
            <h1 className="text-2xl text-white font-bold p-4">New Expense</h1>
            <span className="bg-blue-500 h-[10px] w-16 sm:w-20 lg:w-24 block rounded-2xl mx-4"></span>

            <div className="p-4">
              <label className="text-blue-600 mb-2 block font-medium">
                Type:
              </label>
              <select
                className="w-full border-b-2 border-gray-600 bg-transparent text-white p-2 focus:outline-none focus:border-blue-500 max-w-[300px]"
                value={expense.type}
                onChange={(e) =>
                  setExpense({ ...expense, type: e.target.value })
                }
              >
                <option value="" disabled className="text-white bg-gray-800">
                  Select a category
                </option>
                <option value="Food" className="text-white bg-gray-800">
                  Food
                </option>
                <option value="Travel" className="text-white bg-gray-800">
                  Travel
                </option>
                <option value="Rent" className="text-white bg-gray-800">
                  Rent
                </option>
                <option value="Bills" className="text-white bg-gray-800">
                  Bills
                </option>
                <option
                  value="Entertainment"
                  className="text-white bg-gray-800"
                >
                  Entertainment
                </option>
                <option value="Other" className="text-white bg-gray-800">
                  {" "}
                  Other
                </option>
              </select>

              <label className="text-blue-600 my-2 block font-medium">
                Amount:
              </label>
              <input
                type="number"
                className="w-full border-b-2 border-gray-600 bg-transparent text-white p-2 focus:outline-none focus:border-blue-500 max-w-[300px]"
                value={expense.amount}
                onChange={(e) =>
                  setExpense({ ...expense, amount: Number(e.target.value) })
                }
              />

              <label className="text-blue-600 my-2 block font-medium">
                Description:
              </label>
              <textarea
                className="w-full border-2 border-gray-600 bg-transparent text-white p-2 rounded-lg focus:outline-none focus:border-blue-500 max-w-[300px]"
                value={expense.description}
                onChange={(e) =>
                  setExpense({ ...expense, description: e.target.value })
                }
              />
              <button
                className="mr-4 bg-gray-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 mt-10 max-w-[200px]"
                onClick={handleAddExpense}
              >
                Add
              </button>
              <button
                className=" mx-4 bg-gray-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 mt-10 max-w-[200px]"
                onClick={() => {
                  setModalOpen(false);
                  setExpense({
                    type: "",
                    amount: 0,
                    description: "",
                    happened_at: "",
                    expense_id: "",
                    user_id: "",
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
