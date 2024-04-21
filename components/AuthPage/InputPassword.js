import { useRef, useState } from "react";

import stylesSignIn from "./SignInForm.module.scss";
import stylesSignUp from "./SignUpForm.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

export default function InputPassword({ type, name, styles, label }) {
  const inputRef = useRef();
  const [userType, setUserType] = useState(type);

  const inputStyles = styles === "signIn" ? stylesSignIn : stylesSignUp;

  const showPasswordHandle = () => {
    if (userType === "password") {
      inputRef.current.type = "text";
      setUserType("text");
    } else {
      inputRef.current.type = "password";
      setUserType("password");
    }
  };

  return (
    <div className={inputStyles.inputBox}>
      <input
        type={userType}
        name={name}
        id={name}
        placeholder=""
        required
        ref={inputRef}
      />
      <label htmlFor={name}>{label}</label>
      {userType === "text" && (
        <FontAwesomeIcon icon={faEye} onClick={showPasswordHandle} />
      )}
      {userType === "password" && (
        <FontAwesomeIcon icon={faEyeSlash} onClick={showPasswordHandle} />
      )}
    </div>
  );
}
