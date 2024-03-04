import { useState } from "react";
import { useNavigate } from "react-router-dom";
export function LoginPage(){
        let count = 1
    function Mainpage(){
        const Navigate = useNavigate();
        const [loginbtn, setloginbtn] = useState("Login");
        const [togglebtn, settogglebtn] = useState("Signup");
    function toggle(e){
        
        if(count%2 !== 0){
            setloginbtn("Signup")
            settogglebtn("Login")
        }
        else{
            setloginbtn("Login")
            settogglebtn("Signup")
        }
        count++; 
    }
    return(
        <div className="login-container1">
            <div className="login-container2">
                <div className="loginmain">
                    <h1 className="heading">Welcome to ShoeMaTe</h1>
                    <h2 className="heading2">Login / Signup to proceed</h2>
                    <div className="logininputs-container">
                        <input type="text" className="logininputs" placeholder="Enter your email address"/>
                        <input type="text" className="logininputs" placeholder="Enter your password"/>
                    </div>
                    <div className="loginbuttons">
                        <button className="togglebtn" onClick={toggle}><span className="togglebtntxt">{togglebtn}</span></button>
                        <button className="loginbtn" onClick={()=>{Navigate("/home")}}><span className="loginbtntxt">{loginbtn}</span></button>
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
