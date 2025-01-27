"use client";
import SavingsCard from "@/components/cards/SavingsCard";
import { ExpensePieChart } from "@/components/Charts/ExpensePieChart";
import MonthlyExpenseTable from "@/components/Tables/MonthlyExpenseTable";
import { month, months, user_id, year } from "@/data/data";
import {
  getMonthlyExpensesByUserId,
  getTotalExpenseByType,
} from "@/services/expense.services";
import { Expense } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ExpensePage = () => {
  const router = useRouter();

  if (!localStorage.getItem("user_id")) {
    router.push("/auth");
  }

  const [expenses, setExpenses] = useState<Expense[]>([]);
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const expenses = await getMonthlyExpensesByUserId(
          user_id!,
          month,
          year
        );
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

  const d = new Date();
  const m = d.getMonth();
  const monthStr = months[m];
  const yearStr = d.getFullYear();

  const [typeTotals, setTypeTotals] = useState<
    { type: string; total: number }[]
  >([]);

  useEffect(() => {
    const fetchTypeTotals = async () => {
      try {
        const data = await getTotalExpenseByType(user_id!, month, year);
        setTypeTotals(data);
      } catch (error) {
        console.error("Error fetching type totals:", error);
      }
    };
    try {
      fetchTypeTotals();
    } catch (error) {
      console.error("Error fetching type totals:", error);
    }
  }, []);

  return (
    <div className="flex h-full bg-gray-800 flex-col">
      <div className="m-6">
        <h1 className="text-white text-4xl font-bold">Expenses</h1>
        <p className="text-blue-300 text-lg font-semibold">
          {monthStr} {yearStr}
        </p>
        <span className="bg-blue-500 h-[10px] w-16 sm:w-20 lg:w-24 block rounded-2xl"></span>
      </div>
      <div className="m-6 flex flex-col items-center justify-center md:flex-row gap-2 md:gap-6">
        <div className="hover:shadow-lg transform hover:scale-105 transition-transform duration-30">
          <ExpensePieChart month={monthStr} year={yearStr} data={typeTotals} />
        </div>
        <div className="hover:shadow-lg transform hover:scale-105 transition-transform duration-30">
          <SavingsCard data={typeTotals} />
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
