import { getEditedTaskInfo } from "@/lib/tasks";

import EditForm from "./EditForm";

export default async function EditPage({ searchParams }) {
  const { errorMessage, result } = await getEditedTaskInfo(searchParams);

  if (errorMessage) throw new Error(errorMessage);

  return <EditForm taskData={result} />;
}
