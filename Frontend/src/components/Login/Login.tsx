import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { emailValidator } from '../../helpers/emailValidator'
import { passwordValidator } from '../../helpers/passwordValidator'
import { login } from '../../helpers/connector'
import { useNavigate } from 'react-router-dom';
import "./LoginPage.css";
  
function LoginPage() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues:{
      email:'',
      password:''
    },
    onSubmit: values=>{
      const emailError = emailValidator(values.email)
      const passwordError = passwordValidator(values.password)
      if (emailError || passwordError) {
        alert("invalid name, email or password")
        return
      }else{
          login(values.email, values.password).then(()=>{
            console.log("loggin")
            navigate("/dashboard")
          }).catch(()=>{
            alert("Error Logging in")
          })
      }
    }
  })


  return (
    <div className = "App">
      <Link to = "/" className = "welcomeLink"> Welcome Page</Link>
      <header className = "LoginPage-header">
      <form className="loginForm" onSubmit={formik.handleSubmit}>
        <div className="email">
          <label htmlFor='email'>Your email : </label>
          <input onChange={formik.handleChange} value={formik.values.email} id='email' name='email'></input>
          {formik.errors.email ? <div>{formik.errors.email}</div>: null}
        </div>
        <div className="password">
          <label htmlFor ='password'>Password : </label>
          <input onChange={formik.handleChange} value = {formik.values.password} id='password' name='password'></input>
          {formik.errors.password ? <div>{formik.errors.password}</div>: null}
        </div>
        <button className="button" type="submit">Login</button>
        <p>Or don't have an account?</p>
        <Link to = "/first" className = "button">
          <button className="button" type="submit">Sign up</button>
        </Link>
      </form>
      </header>
    </div>
    
  );
}
  
export default LoginPage;