import "@/styles/globals.scss";

import SidebarArea from "@/components/Sidebar/SidebarArea";
import { verifySession } from "@/lib/session";
import { MongoClient, ObjectId } from "mongodb";

export const metadata = {
  title: "Manageo - personal assistant",
  description:
    "Plan, save and review your events and tasks. Control your budget with our application!",
};

import LoginPage from "@/components/AuthPage/AuthPage";

export default async function RootLayout({ children }) {
  const { isAuth, userId } = await verifySession();

  const client = await MongoClient.connect(
    process.env.NEXT_PUBLIC_MONGODB_USERS_DATA
  );

  const db = client.db();

  const usersCollection = db.collection("users");
  const userData = await usersCollection.findOne({
    _id: new ObjectId(userId),
  });

  return (
    <html lang="en">
      <body>
        {isAuth && (
          <>
            <SidebarArea username={userData.username} email={userData.email} />
            <main className="mainContent">{children}</main>
          </>
        )}
        {!isAuth && <LoginPage />}
      </body>
    </html>
  );
}
