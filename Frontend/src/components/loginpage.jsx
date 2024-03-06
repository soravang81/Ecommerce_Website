import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { token } from "../store/cardstate";


export function LoginPage(){
    let togglecount = 0
    function Mainpage(){
        const Token = useRecoilValue(token)
        const setToken = useSetRecoilState(token)
        const Navigate = useNavigate();
        const [email ,setEmail] = useState("");
        const [password ,setPass] = useState("");
        const [error, setError] = useState(false);
        const [ifSignup , setIfSignup] = useState(true)
        const [errormsg , setErrormsg] = useState("")
        const [redirect , setRedirect] = useState(false);
        const [togglebtntxt , settogglebtntxt] = useState("Signup")
        const [redirectMsg ,setRedirectMsg] = useState("")
        const emailfield = useRef(null);
        const passfield = useRef(null)
        const body = {
            email ,
            password
          };



        async function login(){
            setEmail("");setPass("");setRedirect(false);setError(false)
            const ifExists = await axios.post("http://localhost:3000/login" , body)
            if(ifExists.data.result == true){
                setToken(ifExists.data.token)
                Navigate("/home")
            }
            else{
                setErrormsg(ifExists.data)
                setError(true);
            }
        }


        function togglesignup(){
            setEmail("");setPass("");setRedirect(false);setError(false)
            if(togglecount%2 == 0){
                settogglebtntxt("Login")
                setIfSignup(false); 
            }
            else{
                setError(false)
                settogglebtntxt("Signup")
                setIfSignup(true); 
            }
            togglecount++
        }



        async function signup(){
            setEmail("");setPass("");setRedirect(false);setError(false)
            const isSignedin = await axios.post("http://localhost:3000/signup" , body)
            if(isSignedin.data.res !== true){
                console.log(isSignedin.data.msg)
                setRedirectMsg(isSignedin.data.msg);
                setRedirect(true)
            }
            else{
                console.log("esle called")
                setRedirect(true)
                setRedirectMsg(isSignedin.data.msg);
                settogglebtntxt("Signup")
                setIfSignup(true);
                console.log(email , password)
            }
        }
    

        return(
            <div className="login-container1">
                <div className="login-container2">
                    <div className="loginmain">
                        <h1 className="heading">Welcome to ShoeMaTe</h1>
                        <h2 className="heading2">Login / Signup to proceed</h2>
                        <div className="logininputs-container">
                            <input type="text" className="logininputs" id="loginemail" ref={emailfield} onChange={(e)=>{setEmail(e.target.value);setRedirect(false) ; setError(false)}} value={email} placeholder="Enter your email address"/>
                            <input type="text" className="logininputs" id="loginpassword" ref={passfield} onChange={(e)=>{setPass(e.target.value);setRedirect(false) ; setError(false)}} value={password} placeholder="Enter your password"/>
                            {error && <div className="loginerr">{errormsg}</div>}
                            {redirect && <div className="loginerr">{redirectMsg}</div> }
                        </div>
                        <div className="loginbuttons">
                            <button className="togglebtn" onClick={togglesignup}><span className="togglebtntxt">{togglebtntxt}</span></button>
                            <div>
                                {ifSignup ? (
                                    <button className="loginbtn" onClick={login}><span className="loginbtntxt">Login</span></button>
                                ) : (
                                    <button className="loginbtn" onClick={signup}><span className="loginbtntxt">Signup</span></button>
                                )}
                            </div>
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
