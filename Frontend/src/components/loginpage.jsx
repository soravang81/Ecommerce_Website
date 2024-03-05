import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { token } from "../store/cardstate";

export function LoginPage(){
    function Mainpage(){
        const Token = useRecoilValue(token)
        const setToken = useSetRecoilState(token)
        const Navigate = useNavigate();
        const [email ,setEmail] = useState("");
        const [password ,setPass] = useState("");
        const [error, setError] = useState(false);
        const [errormsg , setErrormsg] =useState("User does not exist. Please signup first.")


        async function login(){
            
            const body = {
                email ,
                password
              };
            const ifExists = await axios.post("http://localhost:3000/login" , body)
            if(ifExists.data.result == true){
                setToken(ifExists.data.token)
                Navigate("/home")
            }
            else if(ifExists.data == false){
                setError(true);
            }
            else{
                setErrormsg(ifExists.data)
                setError(true);
            }
        }
    
        return(
            <div className="login-container1">
                <div className="login-container2">
                    <div className="loginmain">
                        <h1 className="heading">Welcome to ShoeMaTe</h1>
                        <h2 className="heading2">Login / Signup to proceed</h2>
                        <div className="logininputs-container">
                            <input type="text" className="logininputs" id="loginemail" onInput={(e)=>{setEmail(e.target.value)}} placeholder="Enter your email address"/>
                            <input type="text" className="logininputs" id="loginpassword" onInput={(e)=>{setPass(e.target.value)}} placeholder="Enter your password"/>
                            {error && <div className="loginerr">{errormsg}</div>}
                        </div>
                        <div className="loginbuttons">
                            <button className="togglebtn" ><span className="togglebtntxt">Signup</span></button>
                            <button className="loginbtn" onClick={login}><span className="loginbtntxt">Login</span></button>
                        </div>
                    </div>
                </div>
            </div>
        
    )
    }
    return(
        <>
            <Mainpage/>
        </>
    )
}
