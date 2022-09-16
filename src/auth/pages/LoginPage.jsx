import { Link } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";

export const LoginPage = () => {
  return (
    <AuthLayout title={'Login'}>
      <form className="mb-3 mt-3">
        <div className="form-group mb-2">
          <input type="text" className="form-control" placeholder="Correo" />
        </div>
        <div className="form-group mb-2">
          <input
            type="password"
            className="form-control"
            placeholder="Contraseña"
          />
        </div>
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
