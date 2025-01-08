import SavingsCard from "@/components/cards/SavingsCard";
import { ExpensePieChart } from "@/components/Charts/ExpensePieChart";
import MonthlyExpenseTable from "@/components/Tables/MonthlyExpenseTable";

const ExpensePage = () => {
  const expenses = [
    {
      id: "1",
      date: "2023-10-01",
      type: "Food",
      amount: 50.0,
      description: "Groceries",
    },
    {
      id: "2",
      date: "2023-10-02",
      type: "Transport",
      amount: 20.0,
      description: "Bus fare",
    },
    {
      id: "3",
      date: "2023-10-03",
      type: "Utilities",
      amount: 100.0,
      description: "Electricity bill",
    },
    {
      id: "4",
      date: "2023-10-04",
      type: "Entertainment",
      amount: 75.0,
      description: "Movie tickets",
    },
    {
      id: "5",
      date: "2023-10-05",
      type: "Health",
      amount: 150.0,
      description: "Doctor visit",
    },
    {
      id: "6",
      date: "2023-10-06",
      type: "Food",
      amount: 60.0,
      description: "Dining out",
    },
    {
      id: "7",
      date: "2023-10-07",
      type: "Transport",
      amount: 25.0,
      description: "Taxi fare",
    },
    {
      id: "8",
      date: "2023-10-08",
      type: "Utilities",
      amount: 110.0,
      description: "Water bill",
    },
    {
      id: "9",
      date: "2023-10-09",
      type: "Entertainment",
      amount: 80.0,
      description: "Concert tickets",
    },
    {
      id: "10",
      date: "2023-10-10",
      type: "Health",
      amount: 160.0,
      description: "Medication",
    },
    {
      id: "11",
      date: "2023-10-11",
      type: "Food",
      amount: 55.0,
      description: "Groceries",
    },
    {
      id: "12",
      date: "2023-10-12",
      type: "Transport",
      amount: 30.0,
      description: "Train fare",
    },
    {
      id: "13",
      date: "2023-10-13",
      type: "Utilities",
      amount: 120.0,
      description: "Gas bill",
    },
    {
      id: "14",
      date: "2023-10-14",
      type: "Entertainment",
      amount: 85.0,
      description: "Theater tickets",
    },
    {
      id: "15",
      date: "2023-10-15",
      type: "Health",
      amount: 170.0,
      description: "Dental checkup",
    },
  ];
  console.log(process.env.HOST_URL);
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date();
  const name = month[d.getMonth()];
  const year = d.getFullYear();

  console.log(name);
  return (
    <div className="flex h-full bg-gray-800 flex-col">
      <div className="m-6">
        <h1 className="text-white text-4xl font-bold">Expenses</h1>
        <p className="text-blue-300 text-lg font-semibold">
          {name} {year}
        </p>
        <span className="bg-blue-500 h-[10px] w-16 sm:w-20 lg:w-24 block rounded-2xl"></span>
      </div>
      <div className="m-6 flex flex-col items-center justify-center md:flex-row gap-2 md:gap-6">
        <div className="hover:shadow-lg transform hover:scale-105 transition-transform duration-30">
          <ExpensePieChart month={name} year={year} />
        </div>
        <div className="hover:shadow-lg transform hover:scale-105 transition-transform duration-30">
          <SavingsCard />
        </div>
        <div>something more</div>
      </div>

      <div className="m-6 w-auto">
        <MonthlyExpenseTable expenses={expenses} />
      </div>
    </div>
  );
};

export default ExpensePage;
