import { ExpensePieChart } from "@/components/ExpensePieChart";

const ExpensePage = () => {
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
        <div>Something else</div>
        <div>something more</div>
      </div>

      <div>Detailed Table</div>
    </div>
  );
};

export default ExpensePage;
