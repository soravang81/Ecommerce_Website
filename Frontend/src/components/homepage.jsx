import { useNavigate } from "react-router-dom";
// import { token } from "../store/cardstate";

function LpBody(){
    const Navigate = useNavigate();
    
    
    return(
    <div className="landingmain">
        <div className="lpbody">
            <h1><span id="lpbodyh1">Summer sale is Live.</span></h1>
            <button id="shopnowbtn" onClick={()=>Navigate("/shop")}><span id="shopnowtxt">Shop Now</span></button>
        </div>
    </div>
    )
}

function HomePage(){
    return(
        <>
            <LpBody/>
        </>
    )
}

export { HomePage }
