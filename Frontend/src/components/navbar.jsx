import { useNavigate } from "react-router-dom";
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { fetchData , tokenAtom ,reFetchCartData } from "../store/cardstate";

export function NavBar(){
    const Navigate = useNavigate();
    const [fetch ,setRefetch] = useRecoilState(fetchData);
    const [FetchCartData ,setreFetchCartData] = useRecoilState(reFetchCartData);
    const setToken = useSetRecoilState(tokenAtom);

    return(
        <div className="navbar-container">
            <div className="navbar">
                <div className="navbar-left">
                    <button className="logo"><span id="logotxt">ShoeMaTe</span></button>
                </div>
                <div className="navbar-right">
                    <button className="navbarbtn" onClick={()=>{Navigate("/home")}}><span className="navbarbtntxt">Home</span></button>
                    <button className="navbarbtn" onClick={()=>{Navigate("/shop") ; setRefetch(fetch+1);}}><span className="navbarbtntxt">Shop</span></button>
                    <button className="navbarbtn" onClick={()=>{Navigate("/");window.location.reload();localStorage.removeItem("token")}}><span className="navbarbtntxt">Logout</span></button>
                    <button className="navbarbtn" onClick={()=>{Navigate("/cart"); setreFetchCartData(FetchCartData+1);}}><span className="navbarbtntxt">Cart</span></button>
                    <input type="text" placeholder="   Search for any item" id="search"/>
                    <button className="navbarbtn" id="profile" onClick={()=>{Navigate("/")}}><span className="navbarbtntxt">Login</span></button>
                </div>
            </div>
        </div>
            
    )
}