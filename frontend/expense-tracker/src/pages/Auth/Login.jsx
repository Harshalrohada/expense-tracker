import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';

const Login = () => {
  const [email,SetEmail] = useState("");
  const [password,SetPassword] = useState("");
  const [error,SetError] = useState(null);

  const {updateUser}=useContext(UserContext);

  const navigate=useNavigate();

const handlelLogin=async (e)=>{
     e.preventDefault();

     if(!validateEmail(email)){
      SetError("Please enter a valid email address");
      return;
     }
     if(!password){
      SetError("Please enter the password");
      return ;
     }
     SetError("");

     //Login APi call
     try{
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,
        password,
      });
      const {token,user}=response.data;

      if(token){
        localStorage.setItem("token",token);
        updateUser(user);
        navigate("/dashboard");
      }
     } catch(error){
      if(error.response && error.response.status){
        SetError("Invalid email or password");
      }else{
        SetError("An error occured. Please try again later.");
      }
     }

}
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          please enter your details to log in
        </p>

        <form onSubmit={handlelLogin}>
          <Input
            value={email}
            onChange={({ target }) => SetEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => SetPassword(target.value)}
            label="Password"
            placeholder="Min 8 Charcters"
            type="password"
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">
            LOGIN
          </button>
          <p className="text-[13px] text-slate-800 mt-3">
            Don't have an account?{""}
            <Link className="font-medium text-primary underline" to="/signup">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}

export default Login