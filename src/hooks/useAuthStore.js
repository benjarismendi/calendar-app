import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../api/calendarApi";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";

export const useAuthStore = () => {
  const dispatch = useDispatch();

  const { status, errorMessage, user } = useSelector((state) => state.auth);

  const startLogin = async ({email, password}) => {

    dispatch(onChecking());

    try {

      const { data } = await calendarApi.post('/auth', { email, password });
      
      localStorage.setItem('user', JSON.stringify({
        name: data.name,
        uid: data.uid,
        token: data.token,
        initDate: new Date().getTime(),
      }))

      dispatch(onLogin({ name: data.name, uid: data.uid }))

    } catch (error) {

      dispatch(onLogout(error.response.data?.msg || 'Error'));

      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 1000)
    }
  }


  const startRegister = async ({email, password, username}) => {

    dispatch(onChecking());

    try {

      const { data } = await calendarApi.post('/auth/new', { name: username, email, password });
      
      localStorage.setItem('user', JSON.stringify({
        name: data.name,
        uid: data.uid,
        token: data.token,
        initDate: new Date().getTime(),
      }))

      dispatch(onLogin({ name: data.name, uid: data.uid }))

    } catch (error) {

      dispatch(onLogout(error.response.data?.msg || 'Error'));

      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 1000)
    }
  }

  const checkAuthToken = async () => {
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    if(!token) return dispatch(onLogout());

    try {
      
      const { data } = await calendarApi.get('/auth/renew');
      const user = JSON.parse(localStorage.getItem('user'));

      localStorage.setItem('user', JSON.stringify({
        name: user.name,
        uid: user.uid,
        token: data.token,
        initDate: new Date().getTime(),
      }))

      dispatch( onLogin({ name: user.name, uid: user.uid }) )

    } catch (error) {
      dispatch( onLogout() );
      localStorage.clear();
    }
  }



  return {
    // Propiedades
    status,
    errorMessage,
    user,
    // Metodos
    startLogin,
    startRegister,
    checkAuthToken,
  };
};
