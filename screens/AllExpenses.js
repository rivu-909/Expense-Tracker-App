import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput.js";
import { ExpensesContext } from "../store/expenses-context.js";

export default function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriod="Total"
      fallbackText="No registered expenses found"
    />
  );
}
