import PageHeader from "@/ui/PageHeader";
import ExpenseChoice from "@/components/Expenses/ExpenseChoice";
import FinansesSummary from "@/components/Expenses/FinansesSummary";
import DetailsSummary from "@/components/Expenses/DetailsSummary";

import { verifySession } from "@/lib/session";
import { getUserExpenses, getUserGoals } from "@/lib/expenses";

export const metadata = {
  title: "Expenses | Manageo - personal assistant",
};

export default async function ExpensesPage() {
  const { userId } = await verifySession();

  const userExpensesArray = await getUserExpenses(userId);
  const userGoalsArray = await getUserGoals(userId);

  return (
    <>
      <PageHeader title="Expenses" />
      <ExpenseChoice userId={userId} userGoals={userGoalsArray} />
      <FinansesSummary />
      <DetailsSummary expenses={userExpensesArray} />
    </>
  );
}
