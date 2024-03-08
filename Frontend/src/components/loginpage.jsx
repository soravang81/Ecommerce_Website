import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { tokenAtom } from "../store/cardstate";

export function LoginPage() {
    const token = useRecoilValue(tokenAtom);
    const setToken = useSetRecoilState(tokenAtom);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [isLogin, setIsLogin] = useState(true);

    const emailField = useRef(null);
    const passField = useRef(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
    }, [setToken]);

    async function loginOrSignup() {
        setEmail("");
        setPassword("");
        setError(false);

        try {
            const response = await axios.post(`http://localhost:3000/${isLogin ? 'login' : 'signup'}`, { email, password });
            const { data } = response;

            if (data.result===true) {
                setToken(data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
                localStorage.setItem('token', data.token);
                navigate("/home");
            } else {
                setErrorMsg(data.msg);
                setError(true);
            }
        } catch (error) {
            console.error("Error:", error.message);
            setErrorMsg("An error occurred. Please try again.");
            setError(true);
        }
    }

    function handleToggleLoginSignup() {
        setEmail("");
        setPassword("");
        setError(false);
        setIsLogin(!isLogin);
    }

    function handleLogout() {
        localStorage.removeItem('token');
        setToken(null);
        delete axios.defaults.headers.common['Authorization'];
    }

    function ForgetPassword(){
        console.log("Forget password")

    }
    return (
        <div className="login-container1">
            <div className="login-container2">
                <div className="loginmain">
                    <h1 className="heading">Welcome to ShoeMaTe</h1>
                    <h2 className="heading2">Login / Signup to proceed</h2>
                    <div className="logininputs-container">
                        <input 
                            type="text" 
                            className="logininputs" 
                            id="loginemail" 
                            ref={emailField} 
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email} 
                            placeholder="Enter your email address"
                        />
                        <input 
                            type="password" 
                            className="logininputs" 
                            id="loginpassword" 
                            ref={passField} 
                            onChange={(e) => setPassword(e.target.value)} 
                            value={password} 
                            placeholder="Enter your password"
                        />
                        {error && <div className="loginerr">{errorMsg}</div>}
                    </div>
                    <div className="loginbuttons">
                        <button 
                            className="forgetpass"
                            onClick={ForgetPassword}
                        >
                            <span className="forgetpasstxt">Forget password ?</span>
                        </button>
                        <button 
                            className="togglebtn" 
                            onClick={handleToggleLoginSignup}
                        >
                            <span className="togglebtntxt">{isLogin ? "Signup" : "Login"}</span>
                        </button>
                        <button 
                            className="loginbtn" 
                            onClick={loginOrSignup}
                        >
                            <span className="loginbtntxt">{isLogin ? "Login" : "Signup"}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
