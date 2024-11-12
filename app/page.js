import Header from "@/components/Dashboard/header";
import EventsSummary from "@/components/Dashboard/events-summary";
import ExpensesCostChart from "@/components/Dashboard/expenses-cost-chart";

import { verifySession } from "@/lib/session";
import { MongoClient, ObjectId } from "mongodb";

export default async function Home() {
  const { userId } = await verifySession();

  const client = await MongoClient.connect(
    process.env.NEXT_PUBLIC_MONGODB_USERS_DATA
  );

  const db = client.db();

  const usersCollection = db.collection("users");
  const userData = await usersCollection.findOne({
    _id: new ObjectId(userId),
  });

  return (
    <>
      <Header name={userData.username} last_logged={userData.previous_logged} />
      <EventsSummary />
      <ExpensesCostChart />
    </>
  );
}
