import './authLayout.css';

export const AuthLayout = ({ children, title }) => {

  return (
    <div className="auth-container">      
        <div className="col-sm-8 col-md-6 col-lg-4 auth-body">
          <h3>{title}</h3>
          {children}
        </div>      
    </div>
  );
};
