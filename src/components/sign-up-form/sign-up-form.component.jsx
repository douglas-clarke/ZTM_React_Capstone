import { useState } from "react";

import { createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-up-form.styles.scss";

const defaultformFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultformFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultformFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, {
        displayName,
      });

      resetFormFields();
    } catch (error) {
      console.log("user creation encountered an error: ", error);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign Up with you email an password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          required
          type="text"
          onChange={handleChange}
          name="displayName"
          value={displayName}
        ></FormInput>
        <FormInput
          label="Email"
          required
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
        ></FormInput>
        <FormInput
          label="Password"
          required
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
        ></FormInput>
        <FormInput
          label="Confirm Password"
          required
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        ></FormInput>
        <Button type="submit">SIGN UP</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
