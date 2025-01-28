import { sumOf } from "@/utils/calculate";

const ExpenseCard = ({ data }: { data: { type: string; total: number }[] }) => {
  return (
    <div className="bg-gray-950/60 mt-2 p-4 rounded-lg shadow-lg border border-white h-full w-[250px] md:w-[300px] max-w-[90%] md:max-w-[500px] mx-auto">
      <div className="flex flex-col gap-4 text-white">
        {/* Expense List */}
        <div className="flex flex-col border border-white/30 p-4 rounded-lg gap-2">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex justify-between hover:text-blue-500"
            >
              <span>
                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              </span>{" "}
              <span>{item.total}</span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="text-center text-lg font-medium hover:text-blue-500">
          Total: <span className="font-bold">{sumOf(data)}</span>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
