import { getEditedTaskInfo } from "@/lib/tasks";

import EditForm from "./EditForm";

export const metadata = {
  title: "Edit task | Manageo - personal assistant"
};

export default async function EditPage({ searchParams }) {
  const { errorMessage, result } = await getEditedTaskInfo(searchParams);

  if (errorMessage) throw new Error(errorMessage);

  return (
    <EditForm
      taskData={{
        id: result._id.toString(),
        title: result.title,
        description: result.description,
        date: result.date,
        priority: result.priority,
      }}
    />
  );
}
