import PageHeader from "@/ui/PageHeader";
import ExpenseChoice from "@/components/Expenses/ExpenseChoice";

export const metadata = {
  title: "Expenses | Manageo - personal assistant",
};

export default function ExpensesPage() {
  return (
    <>
      <PageHeader title="Expenses" />
      <ExpenseChoice />
    </>
  );
}
