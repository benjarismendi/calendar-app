import { useDispatch, useSelector } from "react-redux";

export const useAuthStore = () => {
  const dispatch = useDispatch();

  const { status, errorMessage, user } = useSelector((state) => state.auth);

  const startLogin = async () => {
    //TODO: try catch
  }

  return {
    // Propiedades
    status,
    errorMessage,
    user,
    // Metodos

  };
};
