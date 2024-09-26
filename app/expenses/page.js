import PageHeader from "@/ui/PageHeader";
import ExpenseChoice from "@/components/Expenses/ExpenseChoice";
import FinansesSummary from "@/components/Expenses/FinansesSummary";
import DetailsSummary from "@/components/Expenses/DetailsSummary";

import { verifySession } from "@/lib/session";

export const metadata = {
  title: "Expenses | Manageo - personal assistant",
};

export default async function ExpensesPage() {
  const { userId } = await verifySession();

  return (
    <>
      <PageHeader title="Expenses" />
      <ExpenseChoice userId={userId} />
      <FinansesSummary />
      <DetailsSummary />
    </>
  );
}
