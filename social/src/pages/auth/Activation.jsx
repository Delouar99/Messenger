import { Link, Navigate, useNavigate } from "react-router-dom"
import AuthHeader from "../../components/AuthHeader/AuthHeader"
import PageHeader from "../../components/PageHeader/PageHeader"
import Cookie from "js-cookie"
import { useEffect } from "react"
import useFormFields from "../../hooks/useFormFields"
import { useDispatch, useSelector } from "react-redux"
import { accountAcctivatebyOTP } from "../../features/auth/authApiSlice"
import { dotsToHyphens } from "../../helpers/helpers"
import { createToast } from "../../utils/toast"
import { getAuthData, setMessageEmpty } from "../../features/auth/authSlice"

const Activation = () => {
const {message, error, loader} = useSelector(getAuthData)

const nevigate = useNavigate()
const token = Cookie.get("Verifytoken")
const dispatch = useDispatch()

 const {input, resetForm, handleInputChange} = useFormFields({
  otp : ""
 })

//account activated
const handleuserActivated = (e) =>{
  e.preventDefault();
  dispatch(accountAcctivatebyOTP({token : dotsToHyphens(token), otp : input.otp}))
}


useEffect(() => {
  if (!token) {
   nevigate("/login")
   }
}, [token, nevigate])

useEffect(() => {
  if (message) {
    createToast(message, "success")
    dispatch(setMessageEmpty())
    resetForm();
    nevigate("/login")
  }
  if (error) {
    createToast(error)
    dispatch(setMessageEmpty())
  }

},[message, error, dispatch, nevigate, resetForm]);





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
                <form onSubmit={handleuserActivated}>
                  <input type="text" placeholder="Activate code" value={input.otp} onChange={handleInputChange} name="otp" />

                  <button type="submit" className="bg-fb-green">Activate Now</button>
                </form>
                <a href="#">Resend OTP</a>
                <a href="#">Resend Activation Link to delour******@gmail.com</a>
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