import PageHeader from "@/ui/PageHeader";
import TasksContainer from "@/components/Tasks/TasksContainer";

export default function Tasks() {
  return (
    <>
      <PageHeader title="task" href="/tasks" />
      <TasksContainer />
    </>
  );
}
