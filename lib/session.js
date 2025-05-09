import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";
import { MongoClient, ObjectId } from "mongodb";
import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.NEXT_PUBLIC_SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error(error);
  }
}

export async function createSession(id, isRememberMe) {
  const expiresAt = isRememberMe
    ? new Date(Date.now() + 5000 * 5000 * 5000)
    : new Date(Date.now() + 20 * 60 * 1000);

  const client = await MongoClient.connect(
    process.env.NEXT_PUBLIC_MONGODB_USERS_DATA
  );
  const db = client.db();
  const sessionsCollection = db.collection("sessions");
  const usersCollection = db.collection("users");

  const user = await usersCollection.findOne({ _id: new ObjectId(id) });
  const previousLogged = user?.last_logged || new Date();

  let updateData = {
    $set: {
      last_logged: new Date(),
      previous_logged: previousLogged,
    },
  };

  const [dataSession, dataLastLogged] = await Promise.all([
    sessionsCollection.insertOne({ userId: id, expiresAt }),
    usersCollection.updateOne({ _id: new ObjectId(id) }, updateData),
  ]);
  const sessionId = dataSession.insertedId;

  const session = await encrypt({ sessionId, expiresAt, userId: id });

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  };

  if (isRememberMe) {
    cookieOptions.expires = expiresAt;
  }

  cookies().set("session", session, cookieOptions);
}

export const verifySession = cache(async () => {
  const cookie = cookies().get("session")?.value;

  if (!cookie) {
    return { isAuth: false };
  }

  const session = await decrypt(cookie);

  if (!session) {
    return { isAuth: false };
  }

  return { isAuth: true, userId: session.userId };
});

export async function getUserData(id) {
  const client = await MongoClient.connect(
    process.env.NEXT_PUBLIC_MONGODB_USERS_DATA
  );
  const db = client.db();
  const usersCollection = db.collection("users");

  const user = await usersCollection.findOne({ _id: new ObjectId(id) });

  return user;
}
