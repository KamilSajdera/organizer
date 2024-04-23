"use server";

function isEmptyField(text) {
  return !text || text.trim() === "";
}

function hasSpecialCharacters(text) {
  let bannedCharacters = /[!#{$%'^=}+&*"()_?<>/-]/;

  return bannedCharacters.test(text);
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

  return console.log("Success!");
}
