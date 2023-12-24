import { Link, useNavigate } from "react-router-dom"
import AuthHeader from "../../components/AuthHeader/AuthHeader"
import PageHeader from "../../components/PageHeader/PageHeader"
import Cookie from "js-cookie"
import { useEffect } from "react"

const Activation = () => {

  const navigate = useNavigate()
 const token = Cookie.get("Verifytoken")


useEffect(() => {
  if (!token) {
   navigate("/login")
   }
}, [token, navigate])





  return (
    <>
    <PageHeader title="Activate your Account" />
        <div className="auth-container">
          <div className="auth-wraper">
            <div className="auth-top">
              <AuthHeader
                title="Activate your Account"
                desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci  "
              />

              <div className="auth-form">
                <form action="">
                  <input type="text" placeholder="Activate code" />

                  <button className="bg-fb-green">Activate Now</button>
                </form>
                <a href="#">Resend OTP</a>
                <a href="#">Resend Activation Link to delou*******@gmail.com</a>
              </div>
            </div>
            <div className="auth-bottom">
              <Link to="/login">Log In</Link>
            </div>
          </div>
        </div>
    
    </>
  )
}

export default Activation