import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { fetchData, tokenAtom } from "../store/cardstate";
// import { token } from "../store/cardstate";

function LpBody(){
    const Navigate = useNavigate();
    const [fetch ,setRefetch] = useRecoilState(fetchData);
    const setToken = useSetRecoilState(tokenAtom);
    
    return(
    <div className="landingmain">
        <div className="lpbody">
            <h1><span id="lpbodyh1">Summer sale is Live.</span></h1>
            <button id="shopnowbtn" onClick={()=>{Navigate("/shop"); setRefetch(fetch+1) ; setToken(null)}}><span id="shopnowtxt">Shop Now</span></button>
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
