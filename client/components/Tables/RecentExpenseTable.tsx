import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Expense } from "@/types/types";

const ExpenseTable = ({ expenses }: { expenses: Expense[] }) => {
  return (
    <Table>
      <TableCaption>Latest Expenses</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.map((expense) => (
          <TableRow key={expense.happened_at}>
            <TableCell className="text-blue-200">
              {new Date(expense.happened_at).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-blue-200">{expense.type}</TableCell>
            <TableCell className="text-right text-blue-200">
              {expense.amount}/=
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ExpenseTable;
