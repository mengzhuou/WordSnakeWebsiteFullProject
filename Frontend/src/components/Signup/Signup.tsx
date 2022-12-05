import React from 'react';
import { Link } from 'react-router-dom';
import "./Signup.css";
import { useFormik } from 'formik';
import { emailValidator } from '../../helpers/emailValidator'
import { passwordValidator } from '../../helpers/passwordValidator'
import { register, login } from '../../helpers/connector'
import { useNavigate } from 'react-router-dom';


function SignUpPage() {
  
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues:{
      email:'',
      password:'',
      name:'',
      dob:'',
    },
    

    onSubmit: values=>{
      var text:string = "Email = ";
      text += values.email + "\nPassword: " + values.password + "\nName = " + values.name + "\nDate of birth: " + values.dob;
      if(window.confirm(text)){
        const emailError = emailValidator(values.email)
        const passwordError = passwordValidator(values.password)
        const nameError =!values.name? "Name can't be empty.":"";
        if (emailError || passwordError || nameError) {
          alert("invalid name, email or password")
          return
        }else{
          register(values.email, values.password, values.name, values.dob).then(()=>{
            login(values.email, values.password).then(()=>{
              console.log("loggin")
              navigate("/menu")
            }).catch(()=>{
              alert("error1")
            })
          }).catch(()=>{
            alert("error2")
          })
        }
      }
    }
  })
  
  return (
    <div className="App">
      <Link to="/" className="welcomeLink">Welcome Page</Link>
      <form className="form" onSubmit={formik.handleSubmit}>
        <p>Sign Up</p>
        <div className="hasMargin">
          <label htmlFor='email'>Email Address (Username) : </label>
          <input onChange={formik.handleChange} value={formik.values.email} id='email' name='email'></input>
        </div>
        <div className="hasMargin">
          <label htmlFor='password'>Password : </label>
          <input onChange={formik.handleChange} value={formik.values.password} id='password' name='password'></input>
        </div>
        <div className="hasMargin">
          <label htmlFor='name'> Name : </label>
          <input onChange={formik.handleChange} value={formik.values.name} id='name' name='name'></input>
          {/* {formik.errors.name ? <div>{formik.errors.name}</div>: null} */}
        </div>
        <div className="hasMargin">
          <label htmlFor='name'> Date of Birth : </label>
          <input placeholder='yyyy-mm-dd' onChange={formik.handleChange} value={formik.values.dob} id='dob' name='dob'></input>
        </div>
        <div>
          <button className="RegisterButton" type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}
  
export default SignUpPage;