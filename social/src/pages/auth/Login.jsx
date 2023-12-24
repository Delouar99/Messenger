import "./Auth.scss";
import { Link } from "react-router-dom";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import PageHeader from "../../components/PageHeader/PageHeader";

const Login = () => {
  return (
    <>
      <PageHeader title="Sign In Here" />
      <div className="auth-container">
        <div className="auth-wraper">
          <div className="auth-top">
            <AuthHeader
              title="Sign In Here"
              desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci  "
            />

            <div className="auth-form">
              <form action="">
                <input type="text" placeholder="Email or Phone number" />
                <input type="text" placeholder="Password" />
                <button className="bg-fb">Log In</button>
              </form>
              <Link to={"/forgot"}>Forgot your password</Link>
            </div>
          </div>
          <div className="auth-bottom">
            <Link to="/register">Create new account</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
