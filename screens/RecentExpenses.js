import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput.js";
import { ExpensesContext } from "../store/expenses-context.js";
import { getDayMinusDays } from "../util/date.js";

export default function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7daysAgo = getDayMinusDays(today, 7);
    return expense.date > date7daysAgo;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallbackText={"No expenses registered for the last 7 days"}
    />
  );
}
