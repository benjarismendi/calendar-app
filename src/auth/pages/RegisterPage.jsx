import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useFormV } from "../../hooks/useFormV";
import { InputForm } from "../components/inputForm";
import { registerFormFields, registerValidations } from "../index";
import { AuthLayout } from "../layout/AuthLayout";

export const RegisterPage = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const {startRegister} = useAuthStore();

  const {
    username,
    email,
    password,
    password2,
    usernameValid,
    emailValid,
    passwordValid,
    password2Valid,
    formState,
    isFormValid,
    onInputChange,
  } = useFormV(registerFormFields, registerValidations);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setIsSubmit(true);
    if (!isFormValid) return;
    // Validacion de password iguales
    if (password !== password2) {
      Swal.fire("Error en el registro", 'Las contraseñas deben ser iguales', "error");
      return;
    }
    startRegister(formState);
    console.log(formState);

  };

  return (
    <AuthLayout title={"Register"}>
      <form className="mb-3 mt-3" onSubmit={handleOnSubmit}>
      <InputForm
          name='username'
          value={username}
          type = 'text'
          onInputChange={onInputChange}
          errorMessage={usernameValid}
          isSubmit={isSubmit}
          placeholder = "Nombre de usuario"
        />
        <InputForm
          name="email"
          value={email}
          type="text"
          onInputChange={onInputChange}
          errorMessage={emailValid}
          isSubmit={isSubmit}
          placeholder="Correo"
        />
        <InputForm
          name="password"
          value={password}
          type="password"
          onInputChange={onInputChange}
          errorMessage={passwordValid}
          isSubmit={isSubmit}
          placeholder="Contraseña"
        />
        <InputForm
          name="password2"
          value={password2}
          type="password"
          onInputChange={onInputChange}
          errorMessage={password2Valid}
          isSubmit={isSubmit}
          placeholder="Repita la contraseña"
        />

        <div className="d-grid gap-2">
          <input type="submit" className="btn btnSubmit" value="Crear cuenta" />
        </div>
      </form>
      <Link to="/auth/login">Ya tengo una cuenta.</Link>
    </AuthLayout>
  );
};
