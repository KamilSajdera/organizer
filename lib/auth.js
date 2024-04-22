"use server";

function isInvalidText(text) {
  return !text || text.trim() === "";
}

export default async function registerUser(prevState, formData) {
  const userData = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    cPassword: formData.get("Cpassword"),
  };

  if (
    isInvalidText(userData.username) ||
    isInvalidText(userData.email) ||
    isInvalidText(userData.password) ||
    isInvalidText(userData.cPassword)
  ) {
    return {
      message:
        "Some of the fields are left blank. Please check it and try again.",
    };
  }

  if (userData.password !== userData.cPassword)
    return { message: "The passwords are different. Correct them." };

  if (!userData.email.includes("@"))
    return { message: "Invalid e-mail field." };

  return console.log("Success!")
}
