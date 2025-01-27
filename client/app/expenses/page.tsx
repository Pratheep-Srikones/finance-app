"use client";

import dynamic from "next/dynamic";

// Dynamically import the component and disable SSR
const ExpensePage = dynamic(
  () => import("../../components/pages/ExpensePageComponent"),
  {
    ssr: false,
  }
);

export default ExpensePage;
