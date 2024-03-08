import { useNavigate } from "react-router-dom";
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { fetchData } from "../store/cardstate";

export function NavBar(){
    const Navigate = useNavigate();
    const setRefetch = useSetRecoilState(fetchData)
    const fetch = useRecoilValue(fetchData)
    return(
        <div className="navbar-container">
            <div className="navbar">
                <div className="navbar-left">
                    <button className="logo"><span id="logotxt">ShoeMaTe</span></button>
                </div>
                <div className="navbar-right">
                    <button className="navbarbtn" onClick={()=>Navigate("/home")}><span className="navbarbtntxt">Home</span></button>
                    <button className="navbarbtn" onClick={()=>{Navigate("/shop") ; setRefetch(fetch+1)}}><span className="navbarbtntxt">Shop</span></button>
                    <button className="navbarbtn"><span className="navbarbtntxt">Contact us</span></button>
                    <button className="navbarbtn"><span className="navbarbtntxt">Filter</span></button>
                    <input type="text" placeholder="   Search for any item" id="search"/>
                    <button className="navbarbtn" id="profile" onClick={()=>{Navigate("/")}}><span className="navbarbtntxt">Login</span></button>
                </div>
            </div>
        </div>
            
    )
}