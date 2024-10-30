"use server";
import { MongoClient } from "mongodb";
import { revalidatePath } from "next/cache";
import { createSession } from "./session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { hashUserPassword } from "./hash";

function isEmptyField(text) {
  return !text || text.trim() === "";
}

function hasSpecialCharacters(text) {
  let bannedCharacters = /[!#{$%'^=}+&*"()_?<>/-]/;

  return bannedCharacters.test(text);
}

async function isUserExists(enteredEmail) {
  const client = await MongoClient.connect(
    process.env.NEXT_PUBLIC_MONGODB_USERS_DATA
  );

  try {
    const db = client.db();
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ email: enteredEmail });
    if (user) return true;
    else return false;
  } catch (error) {
    console.error("An error occured: ", error);
    return false;
  } finally {
    await client.close();
  }
}

export default async function registerUser(prevState, formData) {
  const userData = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    cPassword: formData.get("Cpassword"),
  };

  if (
    isEmptyField(userData.username) ||
    isEmptyField(userData.email) ||
    isEmptyField(userData.password) ||
    isEmptyField(userData.cPassword)
  ) {
    return {
      message:
        "Some of the fields are left blank. Please check it and try again.",
    };
  }

  if (userData.username.length < 5 || userData.username.length > 12)
    return { message: "Username is too short or long!" };

  if (!userData.email.includes("@"))
    return { message: "Invalid e-mail field." };

  if (userData.password.length < 6)
    return { message: "Password is too short!" };

  if (userData.password !== userData.cPassword)
    return { message: "The passwords are different. Correct them." };

  if (
    hasSpecialCharacters(userData.username) ||
    hasSpecialCharacters(userData.email)
  ) {
    return {
      message: "Username input or email input contains banned characters.",
    };
  }

  const userExist = await isUserExists(userData.email);
  if (userExist)
    return { message: "The user with the given email address already exists!" };

  const hashedUserPassword = hashUserPassword(userData.password);
  userData.password = hashedUserPassword;
  userData.cPassword = hashedUserPassword;

  try {
    const client = await MongoClient.connect(
      process.env.NEXT_PUBLIC_MONGODB_USERS_DATA
    );
    const db = client.db();

    const usersCollection = db.collection("users");
    const result = await usersCollection.insertOne(userData);

    client.close();

    return {
      success_message: "You've sign up successfully! Now you can Sign In. ",
    };
  } catch (error) {
    return { error_message: error?.errorResponse?.errmsg };
  }
}

export async function loginUser(prevState, formData) {
  const login = formData.get("email");
  const password = formData.get("password");
  const isRememberChecked = formData.get("remember") === "on";

  if (isEmptyField(login)) return { message: "Login field is empty!" };
  if (isEmptyField(password)) return { message: "Password field is empty!" };

  const userExist = await isUserExists(login);
  if (!userExist)
    return {
      message: "The user with the specified email address does not exist!",
    };

  const client = await MongoClient.connect(
    process.env.NEXT_PUBLIC_MONGODB_USERS_DATA
  );

  try {
    const db = client.db();

    const usersCollection = db.collection("users");
    const isPasswordOk = await usersCollection.findOne({
      email: login,
      password: password,
    });

    if (!isPasswordOk) return { message: "Bad password! Try again." };

    await createSession(isPasswordOk._id.toString(), isRememberChecked);
    revalidatePath("/");
  } catch (error) {
    console.error("Something went wrong while sing in. ", error);
  } finally {
    await client.close();
  }
}

export async function logOut() {
  cookies().delete("session");
  redirect("/");
}
