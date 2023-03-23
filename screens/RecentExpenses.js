import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput.js";
import { ExpensesContext } from "../store/expenses-context.js";
import { fetchExpenses } from "../util/http.js";
import { getDayMinusDays } from "../util/date.js";
import LoadingOverlay from "../components/UI/LoadingOverlay.js";
import ErrorOverlay from "../components/UI/ErrorOverlay.js";

export default function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    // we should not make this function async (discouraged by react team)
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch expenses!");
      }
      setIsFetching(false);
    }

    getExpenses();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

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
