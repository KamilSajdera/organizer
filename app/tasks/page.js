import PageHeader from "@/ui/PageHeader";
import TasksContainer from "@/components/Tasks/TasksContainer";

export default function Tasks({searchParams}) {
  const query = searchParams.q;
  
  return (
    <>
      <PageHeader title="task" href="/tasks" />
      <TasksContainer query={query}/>
    </>
  );
}
