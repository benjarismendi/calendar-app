import { Link } from "react-router-dom";
import { useState } from "react";
import { AuthLayout } from "../layout/AuthLayout";
import { useFormV } from "../../hooks/useFormV";
import {loginFormFields, loginValidations} from '../index'
import { InputForm } from "../components/inputForm";

export const LoginPage = () => {

  const [isSubmit, setIsSubmit] = useState(false)

  const {
    email,
    password,
    emailValid,
    passwordValid,
    formState,
    isFormValid,
    onInputChange
  } = useFormV(loginFormFields, loginValidations);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setIsSubmit(true);
    if(!isFormValid) return;
    console.log(formState)
  }

  return (
    <AuthLayout title={'Login'}>
      <form className="mb-3 mt-3" onSubmit={handleOnSubmit}>
        <InputForm
          name='email'
          value={email}
          type = 'text'
          onInputChange={onInputChange}
          errorMessage={emailValid}
          isSubmit={isSubmit}
          placeholder = "Correo"
        />
        <InputForm
          name='password'
          value={password}
          type = 'password'
          onInputChange={onInputChange}
          errorMessage={passwordValid}
          isSubmit={isSubmit}
          placeholder = "Contraseña"
        />
        <div className="d-grid gap-2">
          <input type="submit" className="btnSubmit" value="Login" />
        </div>        
      </form>
      <Link to="/auth/register">
            Crear una cuenta
        </Link>
    </AuthLayout>
  );
};
